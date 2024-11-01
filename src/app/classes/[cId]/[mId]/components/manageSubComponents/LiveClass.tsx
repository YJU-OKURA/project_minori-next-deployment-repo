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
  // State 관리
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

  // Refs
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
    const baseUrl =
      process.env.NODE_ENV === 'production'
        ? `${protocol}://${window.location.host}/ws`
        : 'ws://localhost:8080';

    // nickname이 없을 경우 기본값 설정
    const safeNickname = nickname || `User_${userId}`;

    // URLSearchParams 사용하여 안전한 URL 생성
    const params = new URLSearchParams({
      roomId: classId.toString(),
      userId: userId.toString(),
      nickname: safeNickname,
    });

    return `${baseUrl}?${params.toString()}`;
  }, [classId, userId, nickname]);

  const handleError = useCallback((error: Error) => {
    console.error('Error:', error);
    setConnectionState('disconnected');
  }, []);

  const handleMediaError = useCallback(
    (error: Error) => {
      handleError(error);
      if (error.name === 'NotAllowedError') {
        // Camera/Mic permission error handling
      } else if (error.name === 'NotFoundError') {
        // Device not found error handling
      }
    },
    [handleError]
  );

  // 로컬 스트림 시작
  const startLocalStream = useCallback(async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const hasVideo = devices.some(device => device.kind === 'videoinput');
      const hasAudio = devices.some(device => device.kind === 'audioinput');

      const stream = await navigator.mediaDevices.getUserMedia({
        video: hasVideo,
        audio: hasAudio,
      });

      localStreamRef.current = stream;

      // Produce audio and video tracks
      for (const track of stream.getTracks()) {
        const producer = await producerTransportRef.current?.produce({
          track,
          encodings: [],
          codecOptions: {},
          appData: {mediaType: 'screen'} satisfies AppData,
          stopTracks: true,
          disableTrackOnPause: true,
        });
        if (producer) {
          producersRef.current.set(track.kind, producer);
        }
      }

      setStreams(prev => ({
        ...prev,
        [`${userId}-video`]: {
          stream,
          type: 'video',
          userId,
          nickname,
        },
      }));

      // 초기 미디어 상태 설정
      stream.getTracks().forEach(track => {
        if (track.kind === 'audio') {
          track.enabled = mediaState.audio;
        } else if (track.kind === 'video') {
          track.enabled = mediaState.video;
        }
      });
    } catch (error) {
      handleMediaError(
        error instanceof Error ? error : new Error(String(error))
      );
      setConnectionState('disconnected');
    }
  }, [userId, nickname, mediaState.audio, mediaState.video, handleMediaError]);

  const monitorTransportState = useCallback(
    (transport: MediasoupTransport<AppData>) => {
      transport.on('connectionstatechange', (state: string) => {
        if (
          state === 'failed' ||
          (state === 'closed' && handleReconnectRef.current)
        ) {
          handleReconnectRef.current?.();
        }
      });
    },
    []
  );

  // WebSocket 연결 설정
  const connectWebSocket = useCallback((): void => {
    console.log('Attempting WebSocket connection to:', wsUrl);

    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log('WebSocket connected successfully');
      setConnectionState('connected');
      ws.send(JSON.stringify({event: 'getRouterRtpCapabilities'}));
    };

    ws.onerror = error => {
      console.error('WebSocket error:', {
        error,
        url: wsUrl,
        readyState: ws.readyState,
      });
      setConnectionState('disconnected');
    };

    ws.onclose = event => {
      console.log('WebSocket closed:', {
        code: event.code,
        reason: event.reason,
        wasClean: event.wasClean,
      });
      setConnectionState('disconnected');
      if (handleReconnectRef.current) {
        handleReconnectRef.current();
      }
    };

    ws.onmessage = async ({data}) => {
      const {event, data: eventData} = JSON.parse(data);

      switch (event) {
        case 'routerRtpCapabilities': {
          try {
            const device = new Device();
            await device.load({routerRtpCapabilities: eventData});
            deviceRef.current = device;
            ws.send(JSON.stringify({event: 'createProducerTransport'}));
          } catch (error) {
            console.error('Failed to load device:', error);
          }
          break;
        }

        case 'producerTransportCreated': {
          const transport = deviceRef.current?.createSendTransport(eventData);
          if (!transport) return;
          if (producerTransportRef.current) {
            monitorTransportState(producerTransportRef.current);
          }

          transport.on(
            'connect',
            async ({dtlsParameters}, callback, errback) => {
              try {
                await ws.send(
                  JSON.stringify({
                    event: 'connectProducerTransport',
                    data: {dtlsParameters},
                  })
                );
                callback();
              } catch (error) {
                errback(
                  error instanceof Error ? error : new Error('Unknown error')
                );
              }
            }
          );

          transport.on(
            'produce',
            async ({kind, rtpParameters, appData}, callback, errback) => {
              try {
                ws.send(
                  JSON.stringify({
                    event: 'produce',
                    data: {kind, rtpParameters, appData},
                  })
                );
                callback({id: Date.now().toString()}); // id를 반환하도록 수정
              } catch (error) {
                errback(
                  error instanceof Error ? error : new Error('Unknown error')
                );
              }
            }
          );

          await startLocalStream();
          break;
        }

        case 'consumerTransportCreated': {
          const transport = deviceRef.current?.createRecvTransport(eventData);
          if (!transport) return;
          if (consumerTransportRef.current) {
            monitorTransportState(consumerTransportRef.current);
          }

          transport.on(
            'connect',
            async ({dtlsParameters}, callback, errback) => {
              try {
                await ws.send(
                  JSON.stringify({
                    event: 'connectProducerTransport',
                    data: {dtlsParameters},
                  })
                );
                callback();
              } catch (error) {
                errback(
                  error instanceof Error ? error : new Error('Unknown error')
                );
              }
            }
          );
          break;
        }

        case 'newProducer': {
          const {producerId, userId: producerUserId} = eventData;
          subscribeToTrack(producerId, producerUserId);
          break;
        }

        case 'consumed': {
          const {id, producerId, kind, rtpParameters} = eventData;
          const consumer = await consumerTransportRef.current?.consume({
            id,
            producerId,
            kind,
            rtpParameters,
          });

          if (!consumer) return;

          consumersRef.current.set(id, consumer);

          const stream = new MediaStream([consumer.track]);
          setStreams(prev => ({
            ...prev,
            [producerId]: {
              stream,
              type: 'video',
              userId: parseInt(producerId.split('-')[0]),
            },
          }));

          ws.send(
            JSON.stringify({
              event: 'resumeConsumer',
              data: {consumerId: id},
            })
          );
          break;
        }

        case 'producerClosed': {
          const {producerId} = eventData;
          setStreams(prev => {
            const newStreams = {...prev};
            delete newStreams[producerId];
            return newStreams;
          });
          break;
        }
      }
    };
  }, [wsUrl, monitorTransportState, startLocalStream]);

  useEffect(() => {
    connectWebSocketRef.current = connectWebSocket;
  }, [connectWebSocket]);

  // 화면 공유 시작
  const startScreenShare = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          displaySurface: 'monitor' as DisplayCaptureSurfaceType,
          width: {ideal: 1920},
          height: {ideal: 1080},
          frameRate: {max: 30},
        },
        audio: {
          autoGainControl: true,
          echoCancellation: true,
          noiseSuppression: true,
        },
      });

      if (!stream) return;

      screenStreamRef.current = stream;

      // Produce screen share track
      const videoTrack = stream.getVideoTracks()[0];
      const producer = await producerTransportRef.current?.produce({
        track: videoTrack,
        encodings: [], // 필요한 경우 인코딩 설정 추가
        codecOptions: {}, // 필요한 경우 코덱 옵션 추가
        appData: {mediaType: 'screen'},
      });
      if (producer) {
        producersRef.current.set('screen', producer);
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

  // 화면 공유 중지
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

  // 수업 종료
  const handleEndClass = useCallback(() => {
    // Close all producers
    producersRef.current.forEach(producer => producer.close());
    producersRef.current.clear();

    // Close all consumers
    consumersRef.current.forEach(consumer => consumer.close());
    consumersRef.current.clear();

    // Close transports
    producerTransportRef.current?.close();
    consumerTransportRef.current?.close();

    // Stop all tracks
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => track.stop());
    }
    if (screenStreamRef.current) {
      screenStreamRef.current.getTracks().forEach(track => track.stop());
    }

    // Close WebSocket
    wsRef.current?.close();

    // Reset states
    setClassStarted(false);
    setStreams({});
    setConnectionState('disconnected');
    setIsSharingScreen(false);
  }, []);

  // 트랙 구독
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

  // 미디어 상태 업데이트
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

        // Notify other participants about media state change
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

  // 재연결 처리
  const handleReconnect = useCallback((): void => {
    if (reconnectAttempts < 5) {
      const delay = Math.min(1000 * Math.pow(2, reconnectAttempts), 30000);
      console.log(
        `Attempting reconnection ${reconnectAttempts + 1}/5 in ${delay}ms`
      );

      setTimeout(() => {
        setReconnectAttempts(prev => prev + 1);
        if (connectWebSocketRef.current) {
          connectWebSocketRef.current();
        }
      }, delay);
    } else {
      console.error('Maximum reconnection attempts reached');
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

  // 수업 시작
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
    const handleAutoReconnect = () => {
      if (connectionState === 'disconnected' && classStarted) {
        handleReconnectRef.current?.();
      }
    };

    const timer = setTimeout(handleAutoReconnect, 3000);

    return () => {
      clearTimeout(timer);
    };
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
