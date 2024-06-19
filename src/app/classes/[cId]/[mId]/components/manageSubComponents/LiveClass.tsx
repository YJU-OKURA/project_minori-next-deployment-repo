/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, {useEffect, useRef, useState} from 'react';

interface LiveClassProps {
  classId: number;
  userId: number;
}

const LiveClass: React.FC<LiveClassProps> = ({classId, userId}) => {
  const [classStarted, setClassStarted] = useState(false);
  const [isSharingScreen, setIsSharingScreen] = useState(false);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const iceCandidatesRef = useRef<any[]>([]);
  const [localDescriptionSet, setLocalDescriptionSet] = useState(false);
  const screenStreamRef = useRef<MediaStream | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  const startWebSocket = () => {
    const ws = new WebSocket(
      // `ws://localhost:8080/?classId=${classId}&userId=${userId}`
      `ws://3.39.137.182:8080/?classId=${classId}&userId=${userId}`
    );
    wsRef.current = ws;

    ws.onopen = async () => {
      console.log('WebSocket connected');
      iceCandidatesRef.current.forEach(candidate => {
        ws.send(JSON.stringify({event: 'candidate', data: candidate}));
      });
      iceCandidatesRef.current = [];

      if (pcRef.current) {
        try {
          const mediaStream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
          });
          mediaStreamRef.current = mediaStream;
          mediaStream
            .getTracks()
            .forEach(track => pcRef.current?.addTrack(track, mediaStream));
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = mediaStream;
          }
          const offer = await pcRef.current.createOffer();
          await pcRef.current.setLocalDescription(offer);
          setLocalDescriptionSet(true);
          ws.send(
            JSON.stringify({
              event: 'offer',
              data: pcRef.current.localDescription,
            })
          );
        } catch (error) {
          console.error('Failed to start media stream', error);
        }
      }
    };

    ws.onmessage = async event => {
      const {event: evt, data} = JSON.parse(event.data);
      console.log('Message received:', evt, data);
      if (evt === 'answer') {
        if (localDescriptionSet) {
          await pcRef.current?.setRemoteDescription(
            new RTCSessionDescription(data)
          );
        } else {
          console.error('Local description not set');
        }
      } else if (evt === 'candidate') {
        if (localDescriptionSet) {
          await pcRef.current?.addIceCandidate(new RTCIceCandidate(data));
        } else {
          iceCandidatesRef.current.push(data);
        }
      }
    };

    ws.onclose = () => {
      console.log('WebSocket closed');
    };
  };

  useEffect(() => {
    if (classStarted) {
      const pc = new RTCPeerConnection({
        iceServers: [
          {
            urls: [
              'stun:stun.l.google.com:19302',
              'stun:stun1.l.google.com:19302',
              'stun:stun2.l.google.com:19302',
              'stun:stun3.l.google.com:19302',
              'stun:stun4.l.google.com:19302',
            ],
          },
          {
            urls: 'turn:3.39.137.182:3478',
            username: 'minori',
            credential: 'minoriwebrtc',
          },
        ],
      });
      //code for creating PeerConnection in each browser

      pcRef.current = pc;

      pc.onicecandidate = event => {
        if (event.candidate) {
          const candidateData = JSON.stringify({
            event: 'candidate',
            data: event.candidate.toJSON(),
          });
          if (wsRef.current?.readyState === WebSocket.OPEN) {
            wsRef.current.send(candidateData);
          } else {
            iceCandidatesRef.current.push(event.candidate.toJSON());
          }
        }
      };

      pc.ontrack = event => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = event.streams[0];
        }
      };

      startWebSocket();

      return () => {
        pcRef.current?.close();
        wsRef.current?.close();
        pcRef.current = null;
        wsRef.current = null;
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = null;
        }
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = null;
        }
      };
    }
  }, [classStarted]);

  const handleStartClass = () => {
    setClassStarted(true);
  };

  const handleEndClass = () => {
    wsRef.current?.close();
    pcRef.current?.close();
    pcRef.current = null;
    wsRef.current = null;
    setClassStarted(false);
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = null;
    }
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = null;
    }
  };

  const startScreenShare = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });
      screenStreamRef.current = mediaStream;
      const videoTrack = mediaStream.getVideoTracks()[0];

      if (pcRef.current) {
        const senders = pcRef.current.getSenders();
        const videoSender = senders.find(
          sender => sender.track?.kind === 'video'
        );
        if (videoSender) {
          videoSender.replaceTrack(videoTrack);
        } else {
          mediaStream
            .getTracks()
            .forEach(track => pcRef.current?.addTrack(track, mediaStream));
        }

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = mediaStream;
        }

        setIsSharingScreen(true);
        wsRef.current?.send(JSON.stringify({event: 'screenShare', data: true}));
      }
    } catch (error) {
      console.error('Screen sharing failed', error);
    }
  };

  const stopScreenShare = async () => {
    if (screenStreamRef.current) {
      screenStreamRef.current.getTracks().forEach(track => track.stop());
      screenStreamRef.current = null;
    }
    setIsSharingScreen(false);
    resetLocalVideo();
    wsRef.current?.send(JSON.stringify({event: 'screenShare', data: false}));
  };

  const resetLocalVideo = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      mediaStreamRef.current = mediaStream;
      const videoTrack = mediaStream.getVideoTracks()[0];

      if (pcRef.current) {
        const senders = pcRef.current.getSenders();
        const videoSender = senders.find(
          sender => sender.track?.kind === 'video'
        );
        if (videoSender) {
          videoSender.replaceTrack(videoTrack);
        } else {
          mediaStream
            .getTracks()
            .forEach(track => pcRef.current?.addTrack(track, mediaStream));
        }

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = mediaStream;
        }
      }
    } catch (error) {
      console.error('Failed to reset local video stream', error);
    }
  };

  const toggleMic = () => {
    if (mediaStreamRef.current) {
      const audioTrack = mediaStreamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsMicOn(audioTrack.enabled);
      }
    }
  };

  const toggleCamera = () => {
    if (mediaStreamRef.current) {
      const videoTrack = mediaStreamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsCameraOn(videoTrack.enabled);
      }
    }
  };

  return (
    <div className="flex flex-col items-center h-screen">
      <div className="bg-[#ffffff] border border-gray-400 shadow-md rounded-lg p-6 w-80 flex flex-col items-center mb-8">
        {!classStarted ? (
          <button
            onClick={handleStartClass}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
          >
            수업 시작
          </button>
        ) : (
          <>
            <button
              onClick={handleEndClass}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md"
            >
              수업 종료
            </button>
            {isSharingScreen ? (
              <button
                onClick={stopScreenShare}
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-md mt-4"
              >
                화면 공유 종료
              </button>
            ) : (
              <button
                onClick={startScreenShare}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md mt-4"
              >
                화면 공유 시작
              </button>
            )}
            <div className="flex justify-center space-x-4 mt-4">
              <button
                onClick={toggleMic}
                className={`${
                  isMicOn ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-500'
                } hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md`}
              >
                {isMicOn ? '마이크 끄기' : '마이크 켜기'}
              </button>
              <button
                onClick={toggleCamera}
                className={`${
                  isCameraOn ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-500'
                } text-white font-bold py-2 px-4 rounded-md`}
              >
                {isCameraOn ? '카메라 끄기' : '카메라 켜기'}
              </button>
            </div>
          </>
        )}
      </div>

      {classStarted && (
        <div
          className="flex flex-col items-center mt-12 overflow-y-auto"
          style={{height: '60vh'}}
        >
          <div className="flex flex-col items-center p-4 mb-8">
            <video
              controls
              autoPlay
              ref={localVideoRef}
              playsInline
              style={{width: '100%'}}
            />
          </div>
          <div className="flex flex-col items-center p-4 mb-8">
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              controls
              style={{width: '100%'}}
            />
          </div>

          <div className="flex flex-col items-center p-4 mb-8">
            <video
              className="h-full w-full rounded-lg"
              controls
              autoPlay
              playsInline
              style={{width: '100%'}}
            />
          </div>
          <div className="flex flex-col items-center p-4 mb-8">
            <video
              className="h-full w-full rounded-lg"
              controls
              autoPlay
              playsInline
              style={{width: '100%'}}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveClass;
