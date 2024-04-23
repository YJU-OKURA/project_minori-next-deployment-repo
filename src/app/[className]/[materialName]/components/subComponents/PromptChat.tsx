import {useEffect, useState} from 'react';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import ChatInput from './ChatInput';
import getPrompt from '@/src/api/prompts/getPrompt';
import patchMessage from '@/src/api/prompts/patchMessage';
import postPrompt from '@/src/api/prompts/postPrompt';
import {PromptMessagesProps} from '@/src/interfaces/prompt';
import icons from '@/public/svgs/prompt';
import '@/src/styles/variable.css';

const PromptChat = ({pId}: {pId: number}) => {
  const [messages, setMsg] = useState<PromptMessagesProps[]>();
  const [inputMsg, setInputMsg] = useState<string>('');
  const [promptRes, setPromptRes] = useState<string>('');
  const [reload, setReload] = useState<boolean>(false);

  useEffect(() => {
    getPrompt(4, pId, 1, 6).then(res => {
      res.messages.reverse();
      setMsg(res.messages);
    });
  }, [reload]);

  const handleClickIcon = (mId: number) => {
    patchMessage(4, pId, mId, true).then(res => {
      console.log(res);
    });
  };

  const chat = async (reader: ReadableStreamDefaultReader) => {
    let feedback = '';
    try {
      while (reader) {
        const {done, value} = await reader.read();
        const decodedValue = new TextDecoder().decode(value);
        feedback += decodedValue;
        setPromptRes(promptRes => promptRes + feedback);

        if (feedback.includes(' ')) {
          console.log(feedback);
          feedback = '';
        }
        if (done) {
          break;
        }
      }
    } catch (error) {
      console.error('ストリームの読み込み中にエラーが発生しました:', error);
    } finally {
      reader.releaseLock();
      setReload(!reload);
      setPromptRes('');
    }
  };

  useEffect(() => {
    if (inputMsg === '') return;
    postPrompt(4, pId, inputMsg, chat).then(() => {
      setInputMsg('');
    });
  }, [inputMsg]);
  return (
    <div className="h-full pt-5">
      <div className="promptContainer overflow-scroll">
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
                  {message.answer.split('\n').map((line, index) => (
                    <div key={index}>
                      <ReactMarkdown>{line}</ReactMarkdown>
                    </div>
                  ))}
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
        {inputMsg ? (
          <div className="pb-5 flex justify-end">
            <div className="w-5/6 bg-gray-300 p-5 rounded-l-lg rounded-tr-lg">
              {inputMsg}
            </div>
          </div>
        ) : null}
        {promptRes ? (
          <div className="pb-5 flex justify-start items-end">
            <div className="w-5/6 bg-blue-300 p-5 rounded-r-lg rounded-tl-lg">
              <ReactMarkdown>{promptRes}</ReactMarkdown>
            </div>
          </div>
        ) : null}
      </div>
      <ChatInput setMsg={setInputMsg} />
    </div>
  );
};

export default PromptChat;
