/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, {useEffect, useRef, useState} from 'react';

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
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const iceCandidatesRef = useRef<any[]>([]);
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
      if (evt === 'offer' && pcRef.current) {
        try {
          console.log('Received offer:', data);
          await pcRef.current.setRemoteDescription(
            new RTCSessionDescription(data)
          );
          const answer = await pcRef.current.createAnswer();
          await pcRef.current.setLocalDescription(answer);
          ws.send(JSON.stringify({event: 'answer', data: answer}));
        } catch (error) {
          console.error('Failed to handle offer:', error);
        }
      } else if (evt === 'candidate') {
        try {
          await pcRef.current?.addIceCandidate(new RTCIceCandidate(data));
        } catch (error) {
          console.error('Failed to add ICE candidate', error);
        }
      }
    };

    ws.onclose = () => {
      console.log('WebSocket closed');
    };
  };

  useEffect(() => {
    if (inClass) {
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
      pc.addEventListener('icecandidate', event => {
        if (event.candidate) {
          wsRef.current?.send(
            JSON.stringify({
              event: 'candidate',
              data: event.candidate,
            })
          );
        }
      });
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
  }, [inClass]);

  const handleJoinClass = () => {
    setInClass(true);
  };

  const handleLeaveClass = () => {
    wsRef.current?.close();
    pcRef.current?.close();
    pcRef.current = null;
    wsRef.current = null;
    setInClass(false);
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = null;
    }
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = null;
    }
  };

  const toggleMicrophone = () => {
    if (mediaStreamRef.current) {
      const audioTrack = mediaStreamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsMicMuted(!audioTrack.enabled);
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
    <div className="relative flex flex-col items-end h-[calc(100%- 122px)]">
      <div className="bg-[#ffffff] border border-gray-400 shadow-md rounded-lg p-6 w-80 flex flex-col items-center mb-8">
        {!inClass ? (
          <button
            onClick={handleJoinClass}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
          >
            수업 입장
          </button>
        ) : (
          <>
            <button
              onClick={handleLeaveClass}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md"
            >
              수업 퇴장
            </button>
            <div className="flex space-x-4 mt-4">
              <button
                onClick={toggleMicrophone}
                className={`${
                  isMicMuted ? 'bg-gray-500' : 'bg-blue-500'
                } hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md`}
              >
                {isMicMuted ? '마이크 켜기' : '마이크 끄기'}
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
