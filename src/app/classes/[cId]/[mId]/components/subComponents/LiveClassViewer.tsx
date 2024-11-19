/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, {useEffect, useRef, useState, useCallback, useMemo} from 'react';
import {Device, types} from 'mediasoup-client';

interface LiveClassViewerProps {
  classId: number;
  userId: number;
}

const LiveClassViewer: React.FC<LiveClassViewerProps> = ({classId, userId}) => {
  const [inClass, setInClass] = useState(false);
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  const deviceRef = useRef<Device | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const consumerTransportRef = useRef<types.Transport | null>(null);
  const consumersRef = useRef<Map<string, types.Consumer>>(new Map());

  const wsUrl = useMemo(() => {
    const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
    const baseUrl =
      process.env.NODE_ENV === 'production'
        ? `${protocol}://${window.location.host}/mediasoup`
        : 'ws://localhost:8000/mediasoup';

    return `${baseUrl}?classId=${classId}&userId=${userId}`;
  }, [classId, userId]);

  const startWebSocket = useCallback(() => {
    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log('WebSocket connected');
      ws.send(JSON.stringify({event: 'getRouterRtpCapabilities'}));
    };

    ws.onmessage = async event => {
      const {event: evt, data} = JSON.parse(event.data);
      console.log('Message received:', evt, data);

      switch (evt) {
        case 'routerRtpCapabilities': {
          if (!deviceRef.current) {
            const device = new Device();
            await device.load({routerRtpCapabilities: data});
            deviceRef.current = device;
            ws.send(JSON.stringify({event: 'createConsumerTransport'}));
          }
          break;
        }

        case 'consumerTransportCreated': {
          const transport = deviceRef.current?.createRecvTransport(data);
          if (!transport) return;
          consumerTransportRef.current = transport;

          transport.on(
            'connect',
            async ({dtlsParameters}, callback, errback) => {
              try {
                ws.send(
                  JSON.stringify({
                    event: 'connectConsumerTransport',
                    data: {dtlsParameters},
                  })
                );
                callback();
              } catch (error) {
                errback(error as Error);
              }
            }
          );

          ws.send(JSON.stringify({event: 'getProducers'}));
          break;
        }

        case 'newProducer': {
          const {producerId} = data;
          ws.send(
            JSON.stringify({
              event: 'consume',
              data: {
                producerId,
                rtpCapabilities: deviceRef.current?.rtpCapabilities,
              },
            })
          );
          break;
        }

        case 'consumed': {
          const {id, producerId: remoteProducerId, kind, rtpParameters} = data;
          const consumer = await consumerTransportRef.current?.consume({
            id,
            producerId: remoteProducerId,
            kind,
            rtpParameters,
          });

          if (!consumer) return;

          consumersRef.current.set(id, consumer);

          const stream = new MediaStream([consumer.track]);
          if (kind === 'video' && remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = stream;
          }

          ws.send(
            JSON.stringify({
              event: 'resumeConsumer',
              data: {consumerId: id},
            })
          );
          break;
        }

        default:
          break;
      }
    };

    ws.onclose = () => {
      console.log('WebSocket closed');
    };
  }, [wsUrl]);

  useEffect(() => {
    if (inClass) {
      startWebSocket();

      return () => {
        wsRef.current?.close();
        consumerTransportRef.current?.close();
        consumersRef.current.forEach(consumer => consumer.close());
        consumersRef.current.clear();
      };
    }
  }, [inClass, startWebSocket]);

  const handleJoinClass = () => {
    setInClass(true);
  };

  const handleLeaveClass = () => {
    wsRef.current?.close();
    consumerTransportRef.current?.close();
    consumersRef.current.forEach(consumer => consumer.close());
    consumersRef.current.clear();
    setInClass(false);
  };

  return (
    <div className="relative flex flex-col items-end h-[calc(100%- 122px)]">
      <div className="bg-[#ffffff] border border-gray-400 shadow-md rounded-lg p-6 w-80 flex flex-col items-center mb-8">
        {!inClass ? (
          <button
            onClick={handleJoinClass}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
          >
            授業参加
          </button>
        ) : (
          <>
            <button
              onClick={handleLeaveClass}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md"
            >
              授業退場
            </button>
            <div className="flex space-x-4 mt-4">
              <button
                onClick={() => setIsMicMuted(!isMicMuted)}
                className={`${
                  isMicMuted ? 'bg-gray-500' : 'bg-blue-500'
                } hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md`}
              >
                {isMicMuted ? 'マイクオン' : 'マイクオフ'}
              </button>
              <button
                onClick={() => setIsCameraOn(!isCameraOn)}
                className={`${
                  isCameraOn ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-500'
                } text-white font-bold py-2 px-4 rounded-md`}
              >
                {isCameraOn ? 'カメラオン' : 'カメラオフ'}
              </button>
            </div>
          </>
        )}
      </div>

      {inClass && (
        <div
          className="flex flex-col items-center mt-4 overflow-y-auto m-auto"
          style={{height: '60vh'}}
        >
          <div className="flex flex-col items-center p-4 mb-8">
            <video
              controls
              autoPlay
              ref={remoteVideoRef}
              playsInline
              style={{width: '100%'}}
            />
          </div>
          <div className="flex flex-col items-center p-4 mb-8">
            <video
              ref={localVideoRef}
              autoPlay
              playsInline
              controls
              style={{width: '100%'}}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveClassViewer;
