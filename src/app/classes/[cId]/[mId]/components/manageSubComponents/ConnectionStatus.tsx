import React, {memo} from 'react';

interface ConnectionStatusProps {
  state: 'connecting' | 'connected' | 'disconnected';
}

const ConnectionStatus: React.FC<ConnectionStatusProps> = memo(({state}) => {
  const getStatusData = (): {color: string; text: string} => {
    const statusMap = {
      connected: {color: 'bg-green-500', text: '接続中'},
      connecting: {color: 'bg-yellow-500', text: '接続試行中...'},
      disconnected: {color: 'bg-red-500', text: '未接続'},
    };
    return statusMap[state];
  };

  const {color, text} = getStatusData();

  return (
    <div
      className="flex items-center mb-4"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <div
        className={`w-3 h-3 rounded-full ${color} mr-2`}
        aria-hidden="true"
      />
      <span className="text-sm text-gray-600">{text}</span>
    </div>
  );
});

ConnectionStatus.displayName = 'ConnectionStatus';
export default ConnectionStatus;
