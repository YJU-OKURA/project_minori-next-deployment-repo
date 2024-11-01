import React, {memo} from 'react';

interface MediaState {
  video: boolean;
  audio: boolean;
}

interface ControlButtonsProps {
  isTeacher: boolean;
  isSharingScreen: boolean;
  mediaState: MediaState;
  isLoading?: boolean;
  disabled?: boolean;
  onEndClass: () => void;
  onToggleScreen: () => void;
  onToggleAudio: () => void;
  onToggleVideo: () => void;
}

const ControlButtons: React.FC<ControlButtonsProps> = memo(
  ({
    isTeacher,
    isSharingScreen,
    mediaState,
    isLoading = false,
    disabled = false,
    onEndClass,
    onToggleScreen,
    onToggleAudio,
    onToggleVideo,
  }) => {
    const buttonClass = (active: boolean, color: string) =>
      `${active ? `bg-${color}-500 hover:bg-${color}-600` : 'bg-gray-500'} 
     text-white font-bold py-2 px-4 rounded-md transition-colors
     disabled:opacity-50 disabled:cursor-not-allowed`;

    return (
      <div className="flex flex-col items-center gap-4">
        <button
          onClick={onEndClass}
          disabled={disabled || isLoading}
          className={buttonClass(true, 'red')}
          aria-label="授業を終了する"
        >
          {isLoading ? '処理中...' : '授業終了'}
        </button>

        {isTeacher && (
          <button
            onClick={onToggleScreen}
            disabled={disabled}
            className={buttonClass(
              isSharingScreen,
              isSharingScreen ? 'yellow' : 'green'
            )}
            aria-label={
              isSharingScreen ? '画面共有を停止する' : '画面共有を開始する'
            }
          >
            {isSharingScreen ? '画面共有停止' : '画面共有開始'}
          </button>
        )}

        <div className="flex justify-center gap-4">
          <button
            onClick={onToggleAudio}
            disabled={disabled}
            className={buttonClass(mediaState.audio, 'blue')}
            aria-label={
              mediaState.audio ? 'マイクをオフにする' : 'マイクをオンにする'
            }
          >
            {mediaState.audio ? 'マイクオン' : 'マイクオフ'}
          </button>
          <button
            onClick={onToggleVideo}
            disabled={disabled}
            className={buttonClass(mediaState.video, 'blue')}
            aria-label={
              mediaState.video ? 'カメラをオフにする' : 'カメラをオンにする'
            }
          >
            {mediaState.video ? 'カメラオン' : 'カメラオフ'}
          </button>
        </div>
      </div>
    );
  }
);

ControlButtons.displayName = 'ControlButtons';
export default ControlButtons;
