import React, {useState, useEffect, useRef, memo} from 'react';

interface VideoBoxProps {
  streamData: {
    stream: MediaStream;
    type: 'video' | 'screen';
    userId: number;
    nickname?: string;
  };
  isLocal: boolean;
}

const VideoBox: React.FC<VideoBoxProps> = memo(({streamData, isLocal}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const videoElement = videoRef.current;

    if (videoElement && streamData.stream) {
      try {
        videoElement.srcObject = streamData.stream;
        setHasError(false);

        const handleCanPlay = () => setIsLoading(false);
        videoElement.addEventListener('canplay', handleCanPlay);

        return () => {
          videoElement.removeEventListener('canplay', handleCanPlay);
        };
      } catch (error) {
        console.error('Error setting video stream:', error);
        setHasError(true);
      }
    }

    // Cleanup srcObject when component unmounts or stream changes
    return () => {
      if (videoElement) {
        videoElement.srcObject = null;
      }
    };
  }, [streamData.stream]);

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  const containerClass =
    'relative aspect-video rounded-lg overflow-hidden ' +
    (hasError || isLoading ? 'bg-gray-800' : 'bg-black');

  return (
    <div className={containerClass}>
      {isLoading && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-pulse text-white">読み込み中...</div>
        </div>
      )}

      {hasError ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white">ビデオの読み込みに失敗しました</span>
        </div>
      ) : (
        <>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted={isLocal}
            className={`w-full h-full object-cover ${
              isLoading ? 'invisible' : 'visible'
            }`}
            onError={handleError}
          />
          <div
            className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded"
            aria-label={`${streamData.nickname || `User ${streamData.userId}`}${
              streamData.type === 'screen' ? ' (画面共有)' : ''
            }`}
          >
            {streamData.nickname || `User ${streamData.userId}`}
            {streamData.type === 'screen' && ' (画面共有)'}
          </div>
        </>
      )}
    </div>
  );
});

VideoBox.displayName = 'VideoBox';
export default VideoBox;
