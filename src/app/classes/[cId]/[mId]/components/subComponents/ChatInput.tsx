import {useState} from 'react';
import {inputProps} from '@/src/interfaces/prompt';

const ChatInput = ({setMsg}: inputProps) => {
  const [inputMsg, setInputMsg] = useState('');

  const handleInputMsg = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMsg(e.target.value);
  };

  const handleKeyPress = async (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleClickButton();
    }
  };

  const handleClickButton = () => {
    if (inputMsg.trim()) {
      setMsg(inputMsg); // 상태 값이 정확히 업데이트된 후 전달
      setInputMsg(''); // 입력 필드 초기화
    }
    console.log(inputMsg);
  };

  return (
    <div className="h-20 flex items-center">
      <div className="w-full border-2 rounded-md flex justify-between items-center overflow-hidden">
        <input
          type="text"
          className="w-full p-3 outline-none"
          placeholder="Please enter your question"
          onChange={handleInputMsg}
          onKeyUp={handleKeyPress}
          value={inputMsg}
        />
        <div className="px-2" onClick={handleClickButton}>
          <div className="w-[25px] h-[25px] bg-gray-700 flex justify-center items-center rounded-full text-white text-sm">
            {'->'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
