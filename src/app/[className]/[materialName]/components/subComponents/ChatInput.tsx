import {useState} from 'react';
import {inputProps} from '@/src/interfaces/prompt';

const ChatInput = ({setMsg}: inputProps) => {
  const [inputMsg, setInputMsg] = useState('');

  const handleInputMsg = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMsg(e.target.value);
  };

  const handleClickButton = () => {
    console.log(inputMsg);
    setMsg(inputMsg);
    setInputMsg('');
  };

  return (
    <div className="h-20 flex items-center">
      <div className="w-full border-2 rounded-md flex justify-between items-center overflow-hidden">
        <input
          type="text"
          className="w-full p-3 outline-none"
          placeholder="Please enter your question"
          onChange={handleInputMsg}
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
