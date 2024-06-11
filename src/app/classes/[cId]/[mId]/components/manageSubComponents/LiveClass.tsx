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
import React, {useEffect, useRef, useState} from 'react';

interface LiveClassProps {
  classId: number;
  userId: number;
}

const LiveClass: React.FC<LiveClassProps> = ({classId, userId}) => {
  const [classStarted, setClassStarted] = useState(false);
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const peerConnections = useRef<{[key: string]: RTCPeerConnection}>({});
  const remoteVideoRefs = useRef<{[key: string]: HTMLVideoElement | null}>({});
  const wsRef = useRef<WebSocket | null>(null);
  const iceCandidatesRef = useRef<{[key: string]: any[]}>({});

  const startWebSocket = () => {
    const ws = new WebSocket(
      `ws://localhost:8080/?classId=${classId}&userId=${userId}`
    );
    wsRef.current = ws;

    ws.onopen = async () => {
      console.log('WebSocket connected');
    };

    ws.onmessage = async event => {
      const {event: evt, data, from} = JSON.parse(event.data);
      console.log('Message received:', evt, data, from);

      if (evt === 'offer') {
        const pc = createPeerConnection(from);
        await pc.setRemoteDescription(new RTCSessionDescription(data));
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        ws.send(JSON.stringify({event: 'answer', data: answer, to: from}));
      } else if (evt === 'answer') {
        const pc = peerConnections.current[from];
        if (pc) {
          await pc.setRemoteDescription(new RTCSessionDescription(data));
        }
      } else if (evt === 'candidate') {
        const pc = peerConnections.current[from];
        if (pc) {
          await pc.addIceCandidate(new RTCIceCandidate(data));
        } else {
          if (!iceCandidatesRef.current[from]) {
            iceCandidatesRef.current[from] = [];
          }
          iceCandidatesRef.current[from].push(data);
        }
      }
    };

    ws.onclose = () => {
      console.log('WebSocket closed');
    };
  };

  const createPeerConnection = (peerId: string) => {
    const pc = new RTCPeerConnection({
      iceServers: [{urls: 'stun:stun.l.google.com:19302'}],
    });
    peerConnections.current[peerId] = pc;

    pc.onicecandidate = event => {
      if (event.candidate) {
        wsRef.current?.send(
          JSON.stringify({
            event: 'candidate',
            data: event.candidate,
            to: peerId,
          })
        );
      }
    };

    pc.ontrack = event => {
      if (!remoteVideoRefs.current[peerId]) {
        remoteVideoRefs.current[peerId] = document.createElement('video');
        remoteVideoRefs.current[peerId]!.autoplay = true;
        remoteVideoRefs.current[peerId]!.playsInline = true;
        document
          .getElementById('remoteVideos')
          ?.appendChild(remoteVideoRefs.current[peerId]!);
      }
      remoteVideoRefs.current[peerId]!.srcObject = event.streams[0];
    };

    if (iceCandidatesRef.current[peerId]) {
      iceCandidatesRef.current[peerId].forEach(candidate => {
        pc.addIceCandidate(new RTCIceCandidate(candidate));
      });
      iceCandidatesRef.current[peerId] = [];
    }

    return pc;
  };

  useEffect(() => {
    if (classStarted) {
      startWebSocket();

      return () => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        Object.values(peerConnections.current).forEach(pc => pc.close());
        if (wsRef.current) wsRef.current.close();
        // eslint-disable-next-line react-hooks/exhaustive-deps
        if (localVideoRef.current) localVideoRef.current.srcObject = null;
        Object.values(remoteVideoRefs.current).forEach(video => {
          if (video) video.srcObject = null;
        });
        remoteVideoRefs.current = {};
      };
    }
  }, [classStarted]);

  const handleStartClass = async () => {
    setClassStarted(true);
    const mediaStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = mediaStream;
    }
    wsRef.current?.send(JSON.stringify({event: 'join', data: null}));
  };

  const handleEndClass = () => {
    setClassStarted(false);
  };

  return (
    <div>
      {!classStarted ? (
        <button onClick={handleStartClass}>Start Class</button>
      ) : (
        <button onClick={handleEndClass}>End Class</button>
      )}
      {classStarted && (
        <div>
          <video ref={localVideoRef} autoPlay playsInline muted />
          <div id="remoteVideos"></div>
        </div>
      )}
    </div>
  );
};

export default LiveClass;
