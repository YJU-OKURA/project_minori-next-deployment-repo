import {useEffect, useState} from 'react';
import Image from 'next/image';
import getPrompt from '@/src/api/prompts/getPrompt';
import patchMessage from '@/src/api/prompts/patchMessage';
import {PromptMessagesProps} from '@/src/interfaces/prompt';
import icons from '@/public/svgs/prompt';

const PromptChat = () => {
  const [messages, setMsg] = useState<PromptMessagesProps[]>();

  useEffect(() => {
    getPrompt(1, 1, 1, 6).then(res => {
      res.messages.reverse();
      setMsg(res.messages);
    });
  }, []);

  const handleClickIcon = (mId: number) => {
    patchMessage(1, 1, mId, true).then(res => {
      console.log(res);
    });
  };

  return (
    <div className="h-full">
      {messages?.map((message, index) => {
        return (
          <div key={index}>
            <div className="pb-5 flex justify-end">
              <div className="w-5/6 bg-gray-300 p-5 rounded-l-lg rounded-tr-lg">
                {message.question}
              </div>
            </div>
            <div className="pb-5 flex justify-start items-end">
              <div className="w-5/6 bg-blue-300 p-5 rounded-r-lg rounded-tl-lg">
                {message.answer}
              </div>
              <div className="px-2">
                <Image
                  src={icons.drive}
                  width={25}
                  height={25}
                  alt="icon"
                  onClick={() => {
                    handleClickIcon(parseInt(message.id));
                  }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PromptChat;
