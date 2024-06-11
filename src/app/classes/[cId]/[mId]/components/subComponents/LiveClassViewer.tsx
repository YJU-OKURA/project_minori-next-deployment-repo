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

import React, {useEffect, useRef, useState} from 'react';

interface LiveClassViewerProps {
  classId: number;
  userId: number;
}

const LiveClassViewer: React.FC<LiveClassViewerProps> = ({classId, userId}) => {
  const [inClass, setInClass] = useState(false);
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const peerConnections = useRef<{[key: string]: RTCPeerConnection}>({});
  const remoteVideoRefs = useRef<{[key: string]: HTMLVideoElement | null}>({});
  const wsRef = useRef<WebSocket | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    if (inClass) {
      startWebSocket();

      return () => {
        Object.values(peerConnections.current).forEach(pc => pc.close());
        if (wsRef.current) wsRef.current.close();
        if (localVideoRef.current) localVideoRef.current.srcObject = null;
        Object.values(remoteVideoRefs.current).forEach(video => {
          if (video) video.srcObject = null;
        });
        remoteVideoRefs.current = {};
      };
    }
  }, [inClass]);

  const handleJoinClass = async () => {
    setInClass(true);
    const mediaStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = mediaStream;
    }
    wsRef.current?.send(JSON.stringify({event: 'join', data: null}));
  };

  const handleLeaveClass = () => {
    setInClass(false);
  };

  return (
    <div>
      {!inClass ? (
        <button onClick={handleJoinClass}>Join Class</button>
      ) : (
        <button onClick={handleLeaveClass}>Leave Class</button>
      )}
      {inClass && (
        <div>
          <video ref={localVideoRef} autoPlay playsInline muted />
          <div id="remoteVideos"></div>
        </div>
      )}
    </div>
  );
};

export default LiveClassViewer;
