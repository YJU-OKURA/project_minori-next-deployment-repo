/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, {useEffect, useRef, useState} from 'react';

interface LiveClassViewerProps {
  classId: string;
  userId: string;
}

const LiveClassViewer: React.FC<LiveClassViewerProps> = ({classId, userId}) => {
  const [inClass, setInClass] = useState(false);
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const iceCandidatesRef = useRef<any[]>([]);
  const [isSharingScreen, setIsSharingScreen] = useState(false);

  const startWebSocket = () => {
    const ws = new WebSocket(
      `ws://localhost:8080/?classId=${classId}&userId=${userId}`
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
      } else if (evt === 'screenShare') {
        setIsSharingScreen(data);
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
        ],
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

  return (
    <div className="relative flex flex-col items-center h-screen">
      <div className="absolute top-0 right-0 m-4">
        {!inClass ? (
          <button
            onClick={handleJoinClass}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
          >
            수업 입장
          </button>
        ) : (
          <button
            onClick={handleLeaveClass}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md"
          >
            수업 퇴장
          </button>
        )}
      </div>
      {inClass && (
        <div
          className="flex flex-col items-center  mt-12 overflow-y-auto"
          style={{height: '60vh'}}
        >
          <div className="flex flex-col items-center p-4 mb-8">
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              controls
              style={{width: '100%'}}
            />
            <input
              type="text"
              placeholder="이름 입력"
              className="mt-2 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex flex-col items-center p-4 mb-8">
            <video
              controls
              autoPlay
              ref={localVideoRef}
              playsInline
              style={{width: '100%'}}
            />
            <input
              type="text"
              placeholder="이름 입력"
              className="mt-2 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
            <input
              type="text"
              placeholder="이름 입력"
              className="mt-2 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
            <input
              type="text"
              placeholder="이름 입력"
              className="mt-2 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveClassViewer;
