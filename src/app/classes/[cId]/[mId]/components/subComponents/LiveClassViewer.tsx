/* eslint-disable react-hooks/exhaustive-deps */
// import React, {useEffect, useRef} from 'react';

// interface LiveClassViewerProps {
//   classId: number;
//   userId: number;
// }

// const LiveClassViewer: React.FC<LiveClassViewerProps> = ({classId, userId}) => {
//   const videoRef = useRef<HTMLVideoElement | null>(null);
//   const pcRef = useRef<RTCPeerConnection | null>(null);
//   const wsRef = useRef<WebSocket | null>(null);

//   useEffect(() => {
//     const pc = new RTCPeerConnection({
//       iceServers: [{urls: 'stun:stun.l.google.com:19302'}],
//     });
//     pcRef.current = pc;

//     const ws = new WebSocket(
//       `ws://localhost:8080/?classId=${classId}&userId=${userId}`
//     );
//     wsRef.current = ws;

//     ws.onopen = () => {
//       console.log('WebSocket opened');
//     };

//     ws.onmessage = async event => {
//       const {event: evt, data} = JSON.parse(event.data);
//       console.log('Message received:', evt, data);
//       if (evt === 'offer' && pcRef.current) {
//         try {
//           console.log('Received offer:', data);
//           await pcRef.current.setRemoteDescription(
//             new RTCSessionDescription(data)
//           );
//           console.log('Set remote description');
//           const answer = await pcRef.current.createAnswer();
//           console.log('Created answer:', answer);
//           await pcRef.current.setLocalDescription(answer);
//           console.log('Set local description with answer');
//           if (wsRef.current) {
//             wsRef.current.send(JSON.stringify({event: 'answer', data: answer}));
//             console.log('Sent answer:', answer);
//           }
//         } catch (error) {
//           console.error('Failed to handle offer:', error);
//         }
//       } else if (evt === 'candidate' && pcRef.current) {
//         try {
//           console.log('Received candidate:', data);
//           await pcRef.current.addIceCandidate(new RTCIceCandidate(data));
//           console.log('Added ICE candidate');
//         } catch (error) {
//           console.error('Failed to add ICE candidate:', error);
//         }
//       }
//     };

//     ws.onclose = () => {
//       console.log('WebSocket closed');
//     };

//     pc.onicecandidate = event => {
//       if (event.candidate && wsRef.current) {
//         wsRef.current.send(
//           JSON.stringify({event: 'candidate', data: event.candidate.toJSON()})
//         );
//       }
//     };

//     pc.ontrack = event => {
//       if (videoRef.current) {
//         videoRef.current.srcObject = event.streams[0];
//       }
//     };

//     return () => {
//       pc.close();
//       ws.close();
//     };
//   }, [classId, userId]);

//   return (
//     <video
//       ref={videoRef}
//       autoPlay
//       playsInline
//       controls
//       style={{width: '100%', height: 'auto'}}
//     />
//   );
// };

// export default LiveClassViewer;

/* eslint-disable @typescript-eslint/no-explicit-any */
// LiveClassViewer.tsx
import React, {useEffect, useRef, useState} from 'react';

interface LiveClassViewerProps {
  classId: number;
  userId: number;
}

const LiveClassViewer: React.FC<LiveClassViewerProps> = ({classId, userId}) => {
  const [inClass, setInClass] = useState(false);
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const iceCandidatesRef = useRef<any[]>([]);

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
      } else if (evt === 'candidate' && pcRef.current) {
        try {
          console.log('Received candidate:', data);
          await pcRef.current.addIceCandidate(new RTCIceCandidate(data));
        } catch (error) {
          console.error('Failed to add ICE candidate:', error);
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
    }

    return () => {
      pcRef.current?.close();
      wsRef.current?.close();
    };
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
    <div className="flex flex-col items-center h-screen">
      <div className="bg-[#ffffff] border border-gray-400 shadow-md rounded-lg p-6 w-80 flex flex-col items-center mb-8 mt-12">
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
          className="flex flex-col items-center border border-gray-400 rounded-lg p-4 mb-8 overflow-y-auto"
          style={{
            height: '60vh',
          }}
        >
          <div
            className="flex flex-col items-center p-4 mb-8"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <video
              controls
              autoPlay
              ref={localVideoRef}
              playsInline
              style={{width: '80%'}}
            />
            <input
              type="text"
              placeholder="이름 입력"
              className="mt-2 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div
            className="flex flex-col items-center p-4 mb-8"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              controls
              style={{width: '80%'}}
            />
            <input
              type="text"
              placeholder="이름 입력"
              className="mt-2 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div
            className="flex flex-col items-center p-4 mb-8"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <video
              className="h-full w-full rounded-lg"
              controls
              autoPlay
              playsInline
              style={{width: '80%'}}
            />
            <input
              type="text"
              placeholder="이름 입력"
              className="mt-2 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div
            className="flex flex-col items-center p-4 mb-8"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <video
              className="h-full w-full rounded-lg"
              controls
              autoPlay
              playsInline
              style={{width: '80%'}}
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
