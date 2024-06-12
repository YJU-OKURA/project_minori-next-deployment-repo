/* eslint-disable react-hooks/exhaustive-deps */
// import React, {useEffect, useRef} from 'react';

// interface LiveClassProps {
//   classId: number;
//   userId: number;
// }

// const LiveClass: React.FC<LiveClassProps> = ({classId, userId}) => {
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

//     ws.onopen = async () => {
//       console.log('WebSocket connected');
//       if (pcRef.current) {
//         const offer = await pcRef.current.createOffer();
//         await pcRef.current.setLocalDescription(offer);
//         console.log('Created offer:', offer);
//         if (wsRef.current && pcRef.current.localDescription) {
//           wsRef.current.send(
//             JSON.stringify({
//               event: 'offer',
//               data: pcRef.current.localDescription,
//             })
//           );
//           console.log('Sent offer:', pcRef.current.localDescription);
//         }
//       }
//     };

//     ws.onmessage = async event => {
//       const {event: evt, data} = JSON.parse(event.data);
//       console.log('Message received:', evt, data);
//       if (evt === 'answer') {
//         await pc.setRemoteDescription(new RTCSessionDescription(data));
//       } else if (evt === 'candidate') {
//         await pc.addIceCandidate(new RTCIceCandidate(data));
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
//       pcRef.current?.close();
//       wsRef.current?.close();
//     };
//   }, [classId, userId]);

//   const startScreenShare = async () => {
//     try {
//       const mediaStream = await navigator.mediaDevices.getDisplayMedia({
//         video: true,
//         audio: true,
//       });
//       mediaStream
//         .getTracks()
//         .forEach(track => pcRef.current?.addTrack(track, mediaStream));
//       if (videoRef.current) {
//         videoRef.current.srcObject = mediaStream;
//       }

//       if (wsRef.current && pcRef.current) {
//         const offer = await pcRef.current.createOffer();
//         await pcRef.current.setLocalDescription(offer);
//         wsRef.current.send(
//           JSON.stringify({event: 'offer', data: pcRef.current.localDescription})
//         );
//       }
//       console.log('Screen sharing started');
//     } catch (error) {
//       console.error('Screen sharing failed', error);
//     }
//   };

//   return (
//     <div>
//       <video
//         ref={videoRef}
//         autoPlay
//         playsInline
//         controls
//         style={{width: '100%'}}
//       />
//       <button onClick={startScreenShare}>Start Screen Sharing</button>
//     </div>
//   );
// };

// export default LiveClass;

/* eslint-disable @typescript-eslint/no-explicit-any */
// LiveClass.tsx
import React, {useEffect, useRef, useState} from 'react';

interface LiveClassProps {
  classId: number;
  userId: number;
}

const LiveClass: React.FC<LiveClassProps> = ({classId, userId}) => {
  const [classStarted, setClassStarted] = useState(false);
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
      if (evt === 'answer') {
        await pcRef.current?.setRemoteDescription(
          new RTCSessionDescription(data)
        );
      } else if (evt === 'candidate') {
        await pcRef.current?.addIceCandidate(new RTCIceCandidate(data));
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
  }, [classStarted]);

  const handleStartClass = () => {
    setClassStarted(true);
  };

  const handleEndClass = () => {
    setClassStarted(false);
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
          <button
            onClick={handleEndClass}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md"
          >
            수업 종료
          </button>
        )}
      </div>

      {classStarted && (
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

export default LiveClass;
