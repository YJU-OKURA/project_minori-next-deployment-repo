/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, {useEffect, useRef, useState, useCallback, useMemo} from 'react';
import {Device, types} from 'mediasoup-client';
import AttendanceCard from '../AttendanceCard';
import ConnectionStatus from './ConnectionStatus';
import ControlButtons from './ControlButtons';
import VideoBox from './VideoBox';

interface StreamsState {
  [streamId: string]: {
    stream: MediaStream;
    type: 'video' | 'screen';
    userId: number;
    nickname?: string;
  };
}

interface MediaState {
  video: boolean;
  audio: boolean;
}

interface LiveClassProps {
  classId: number;
  userId: number;
  isTeacher?: boolean;
  nickname?: string;
}

interface MediasoupTransport<T extends AppData = AppData>
  extends Omit<types.Transport<T>, 'on' | 'emit'> {
  emit<K extends keyof types.TransportEvents>(
    event: K,
    ...args: types.TransportEvents[K]
  ): boolean;
  on<K extends keyof types.TransportEvents>(
    event: K,
    callback: (...args: types.TransportEvents[K]) => void
  ): this;
}

type Producer<
  AppData extends Record<string, unknown> = Record<string, unknown>,
> = types.Producer<AppData>;
type Consumer<
  AppData extends Record<string, unknown> = Record<string, unknown>,
> = types.Consumer<AppData>;
type AppData = {
  mediaType?: string;
  [key: string]: unknown;
};

const LiveClass: React.FC<LiveClassProps> = ({
  classId,
  userId,
  isTeacher = false,
  nickname = '',
}) => {
  const [classStarted, setClassStarted] = useState(false);
  const [connectionState, setConnectionState] = useState<
    'connecting' | 'connected' | 'disconnected'
  >('disconnected');
  const [streams, setStreams] = useState<StreamsState>({});
  const [mediaState, setMediaState] = useState<MediaState>({
    video: true,
    audio: true,
  });
  const [isSharingScreen, setIsSharingScreen] = useState(false);
  const [reconnectAttempts, setReconnectAttempts] = useState(0);

  const deviceRef = useRef<Device | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const producerTransportRef = useRef<MediasoupTransport<AppData> | null>(null);
  const consumerTransportRef = useRef<MediasoupTransport<AppData> | null>(null);
  const producersRef = useRef<Map<string, Producer<AppData>>>(new Map());
  const consumersRef = useRef<Map<string, Consumer<AppData>>>(new Map());
  const localStreamRef = useRef<MediaStream | null>(null);
  const screenStreamRef = useRef<MediaStream | null>(null);
  const handleReconnectRef = useRef<(() => void) | null>(null);
  const connectWebSocketRef = useRef<(() => void) | null>(null);
  const wsUrl = useMemo(() => {
    const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
    const baseUrl = `${protocol}://${window.location.host}/mediasoup/socket.io`;

    const safeNickname = encodeURIComponent(nickname || `User_${userId}`);
    const params = new URLSearchParams({
      roomId: classId.toString(),
      userId: userId.toString(),
      nickname: safeNickname,
    });

    return `${baseUrl}?${params.toString()}`;
  }, [classId, userId, nickname]);

  const getOptimalEncodings = (kind: string) => {
    if (kind === 'video') {
      return [
        {maxBitrate: 100000, scaleResolutionDownBy: 4, maxFramerate: 15},
        {maxBitrate: 300000, scaleResolutionDownBy: 2, maxFramerate: 30},
        {maxBitrate: 900000, scaleResolutionDownBy: 1, maxFramerate: 60},
      ];
    } else if (kind === 'audio') {
      return [{maxBitrate: 64000}];
    }
    return [];
  };

  // const startLocalStream = useCallback(async () => {
  //   try {
  //     const devices = await navigator.mediaDevices.enumerateDevices();
  //     const hasVideo = devices.some(device => device.kind === 'videoinput');
  //     const hasAudio = devices.some(device => device.kind === 'audioinput');

  //     const stream = await navigator.mediaDevices.getUserMedia({
  //       video: hasVideo,
  //       audio: hasAudio,
  //     });

  //     localStreamRef.current = stream;

  //     if (!producerTransportRef.current || !deviceRef.current) {
  //       throw new Error('Transport or device not initialized');
  //     }

  //     for (const track of stream.getTracks()) {
  //       try {
  //         const producer = await producerTransportRef.current.produce({
  //           track,
  //           encodings: getOptimalEncodings(track.kind),
  //           codecOptions: {},
  //           appData: {mediaType: track.kind},
  //         });

  //         producersRef.current.set(track.kind, producer);

  //         producer.on('transportclose', () => {
  //           console.log(`Producer transport closed: ${producer.id}`);
  //           producer.close();
  //         });
  //       } catch (error) {
  //         console.error(`Failed to produce ${track.kind}:`, error);
  //         track.stop();
  //       }
  //     }

  //     setStreams(prev => ({
  //       ...prev,
  //       [`${userId}-video`]: {
  //         stream,
  //         type: 'video',
  //         userId,
  //         nickname,
  //       },
  //     }));

  //     stream.getTracks().forEach(track => {
  //       if (track.kind === 'audio') {
  //         track.enabled = mediaState.audio;
  //       } else if (track.kind === 'video') {
  //         track.enabled = mediaState.video;
  //       }
  //     });
  //   } catch (error) {
  //     handleMediaError(
  //       error instanceof Error ? error : new Error(String(error))
  //     );
  //   }
  // }, [userId, nickname, mediaState.audio, mediaState.video, handleMediaError]);

  // const monitorTransportState = useCallback(
  //   (transport: MediasoupTransport<AppData>) => {
  //     transport.on('connectionstatechange', (state: string) => {
  //       if (
  //         state === 'failed' ||
  //         (state === 'closed' && handleReconnectRef.current)
  //       ) {
  //         handleReconnectRef.current?.();
  //       }
  //     });
  //   },
  //   []
  // );

  const getOptimalScreenShareConstraints = () => ({
    video: {
      displaySurface: 'monitor' as DisplayCaptureSurfaceType,
      width: {ideal: 1920},
      height: {ideal: 1080},
      frameRate: {max: 30},
      cursor: 'always' as const,
    },
    audio: {
      autoGainControl: true,
      echoCancellation: true,
      noiseSuppression: true,
      sampleRate: 48000,
    },
  });

  const MAX_RECONNECT_ATTEMPTS = 3;
  const RECONNECT_INTERVAL = 2000;

  const connectWebSocket = useCallback(() => {
    let reconnectAttempts = 0;

    const connect = () => {
      if (wsRef.current?.readyState === WebSocket.CONNECTING) {
        console.log('WebSocket connection already in progress');
        return;
      }

      console.log('Attempting WebSocket connection:', wsUrl);

      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      const connectionTimeout = setTimeout(() => {
        if (ws.readyState === WebSocket.CONNECTING) {
          ws.close();
          handleReconnect();
        }
      }, 10000);

      ws.onopen = () => {
        clearTimeout(connectionTimeout);
        console.log('WebSocket connected successfully');
        setConnectionState('connected');
        reconnectAttempts = 0;
      };

      ws.onerror = error => {
        console.error('WebSocket error:', error);
        handleReconnect();
      };

      ws.onclose = () => {
        console.log('WebSocket closed');
        handleReconnect();
      };
    };

    const handleReconnect = () => {
      if (reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
        console.log(`Reconnecting... Attempt ${reconnectAttempts + 1}`);
        setTimeout(() => {
          reconnectAttempts++;
          connect();
        }, RECONNECT_INTERVAL);
      } else {
        console.error('Max reconnection attempts reached');
        setConnectionState('disconnected');
      }
    };

    connect();
  }, [wsUrl]);

  useEffect(() => {
    connectWebSocketRef.current = connectWebSocket;
  }, [connectWebSocket]);

  const startScreenShare = async () => {
    try {
      const constraints = getOptimalScreenShareConstraints();
      const stream = await navigator.mediaDevices.getDisplayMedia(constraints);

      if (!stream) return;

      screenStreamRef.current = stream;

      const videoTrack = stream.getVideoTracks()[0];
      const producer = await producerTransportRef.current?.produce({
        track: videoTrack,
        encodings: getOptimalEncodings('video'),
        codecOptions: {
          videoGoogleStartBitrate: 1000,
        },
        appData: {
          mediaType: 'screen',
          trackId: videoTrack.id,
        },
      });

      if (producer) {
        producersRef.current.set('screen', producer);
        producer.on('trackended', () => {
          stopScreenShare();
        });
      }

      setStreams(prev => ({
        ...prev,
        [`${userId}-screen`]: {
          stream,
          type: 'screen',
          userId,
          nickname,
        },
      }));

      setIsSharingScreen(true);

      videoTrack.onended = () => {
        stopScreenShare();
      };
    } catch (error) {
      console.error('Failed to start screen share:', error);
      setIsSharingScreen(false);
    }
  };

  const stopScreenShare = async () => {
    const producer = producersRef.current.get('screen');
    if (producer) {
      producer.close();
      producersRef.current.delete('screen');
    }

    if (screenStreamRef.current) {
      screenStreamRef.current.getTracks().forEach(track => track.stop());
      screenStreamRef.current = null;

      setStreams(prev => {
        const newStreams = {...prev};
        delete newStreams[`${userId}-screen`];
        return newStreams;
      });

      setIsSharingScreen(false);
    }
  };

  const handleEndClass = useCallback(() => {
    producersRef.current.forEach(producer => producer.close());
    producersRef.current.clear();

    consumersRef.current.forEach(consumer => consumer.close());
    consumersRef.current.clear();

    producerTransportRef.current?.close();
    consumerTransportRef.current?.close();

    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => track.stop());
    }
    if (screenStreamRef.current) {
      screenStreamRef.current.getTracks().forEach(track => track.stop());
    }

    wsRef.current?.close();

    setClassStarted(false);
    setStreams({});
    setConnectionState('disconnected');
    setIsSharingScreen(false);
  }, []);

  const subscribeToTrack = async (
    producerId: string,
    producerUserId: number
  ) => {
    try {
      const {rtpCapabilities} = deviceRef.current!;

      wsRef.current?.send(
        JSON.stringify({
          event: 'consume',
          data: {
            producerId,
            rtpCapabilities,
            userId: producerUserId,
          },
        })
      );
    } catch (error) {
      console.error('Failed to subscribe to track:', error);
    }
  };

  const updateMediaState = useCallback(
    (type: 'audio' | 'video', enabled: boolean) => {
      if (localStreamRef.current) {
        const tracks =
          type === 'audio'
            ? localStreamRef.current.getAudioTracks()
            : localStreamRef.current.getVideoTracks();

        tracks.forEach(track => {
          track.enabled = enabled;
        });

        setMediaState(prev => ({
          ...prev,
          [type]: enabled,
        }));

        wsRef.current?.send(
          JSON.stringify({
            event: 'mediaStateChange',
            data: {
              userId,
              type,
              enabled,
            },
          })
        );
      }
    },
    [userId]
  );

  const handleReconnect = useCallback((): void => {
    if (reconnectAttempts < 5) {
      const delay = Math.min(1000 * Math.pow(2, reconnectAttempts), 30000);
      console.log(`Reconnecting (${reconnectAttempts + 1}/5) in ${delay}ms`);

      setTimeout(() => {
        setReconnectAttempts(prev => prev + 1);
        connectWebSocketRef.current?.();
      }, delay);
    } else {
      console.error('Max reconnection attempts reached');
      handleEndClass();
    }
  }, [reconnectAttempts, handleEndClass]);

  useEffect(() => {
    handleReconnectRef.current = handleReconnect;
  }, [handleReconnect]);

  handleReconnectRef.current = handleReconnect;

  useEffect(() => {
    return () => {
      handleEndClass();
      wsRef.current?.close();
      localStreamRef.current?.getTracks().forEach(track => track.stop());
    };
  }, [handleEndClass]);

  const handleStartClass = useCallback(async () => {
    try {
      setClassStarted(true);
      setConnectionState('connecting');
      connectWebSocketRef.current?.();
    } catch (error) {
      console.error('Failed to start class:', error);
      setClassStarted(false);
      setConnectionState('disconnected');
    }
  }, []);

  useEffect(() => {
    if (connectionState === 'disconnected' && classStarted) {
      const timer = setTimeout(() => {
        handleReconnectRef.current?.();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [connectionState, classStarted]);

  const cleanupStreams = useCallback(() => {
    Object.values(streams).forEach(streamData => {
      if (streamData.stream) {
        streamData.stream.getTracks().forEach(track => {
          track.stop();
          track.enabled = false;
        });
      }
    });
    setStreams({});
  }, [streams]);

  useEffect(() => {
    if (classStarted) {
      connectWebSocketRef.current?.();
    }

    return () => {
      console.log('Cleaning up WebSocket connection');
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
      cleanupStreams();
    };
  }, [classStarted, cleanupStreams]);

  // 비디오 레이아웃 계산
  const getVideoLayout = useCallback(() => {
    const streamCount = Object.keys(streams).length;
    return streamCount <= 1
      ? 'grid-cols-1'
      : streamCount <= 4
      ? 'grid-cols-2'
      : streamCount <= 9
      ? 'grid-cols-3'
      : 'grid-cols-4';
  }, [streams]);

  useEffect(() => {
    if (classStarted) {
      connectWebSocketRef.current?.();
    }

    return () => {
      console.log('Cleaning up WebSocket connection');
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
      cleanupStreams();
    };
  }, [classStarted, cleanupStreams]);

  useEffect(() => {
    const handleNewStream = (event: MessageEvent) => {
      const {event: eventType, data} = JSON.parse(event.data);
      if (eventType === 'newProducer') {
        const {producerId, userId: producerUserId} = data;
        subscribeToTrack(producerId, producerUserId);
      }
    };

    wsRef.current?.addEventListener('message', handleNewStream);

    return () => {
      wsRef.current?.removeEventListener('message', handleNewStream);
    };
  }, [subscribeToTrack]);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      {/* 컨트롤 패널 */}
      <div className="bg-white border border-gray-400 shadow-md rounded-lg p-6 w-80 flex flex-col items-center mb-8 sticky top-4">
        <ConnectionStatus state={connectionState} />
        {!classStarted ? (
          <button
            onClick={handleStartClass}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
            disabled={connectionState === 'connecting'}
          >
            授業開始
          </button>
        ) : (
          <ControlButtons
            isTeacher={isTeacher}
            isSharingScreen={isSharingScreen}
            mediaState={mediaState}
            onEndClass={handleEndClass}
            onToggleScreen={
              isSharingScreen ? stopScreenShare : startScreenShare
            }
            onToggleAudio={() => updateMediaState('audio', !mediaState.audio)}
            onToggleVideo={() => updateMediaState('video', !mediaState.video)}
          />
        )}
      </div>

      {/* 출석부 */}
      {classStarted && isTeacher && (
        <div className="w-80 flex justify-end">
          <AttendanceCard cid={classId} uid={userId} />
        </div>
      )}

      {/* 비디오 그리드 */}
      {classStarted && (
        <div className={`grid ${getVideoLayout()} gap-4 p-4 w-full max-w-7xl`}>
          {Object.entries(streams).map(([streamId, streamData]) => (
            <VideoBox
              key={streamId}
              streamData={streamData}
              isLocal={streamData.userId === userId}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default LiveClass;
