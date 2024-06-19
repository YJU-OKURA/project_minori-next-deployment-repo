'use client';

import {useRef, useState, useEffect} from 'react';
import {useParams} from 'next/navigation';
import Image from 'next/image';
import {useRecoilValue} from 'recoil';
import userState from '@/src/recoil/atoms/userState';
import chatRoomAPI from '@/src/api/chatRoom';
import getUserInfo from '@/src/api/classUser/getUserInfo';
import ChatInput from '@/src/app/classes/[cId]/[mId]/components/subComponents/ChatInput';
import {User} from '@/src/interfaces/user';

interface UserInfo extends User {
  id: number;
}

const ShowMain = () => {
  const user = useRecoilValue(userState) as User;
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  const [chatUsers, setChatUsers] = useState<{[key: string]: User}>({});
  const params = useParams();
  const getClassId = Number(params.cId);
  const getScheduleId = 19;
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleGetMessages = () => {
    chatRoomAPI
      .getMessages(getScheduleId)
      .then(res => {
        if (res && 'data' in res) {
          const {data} = res;
          setMessages(data || []);
        } else {
          console.error('응답에서 data를 찾을 수 없습니다.');
          setMessages([]);
        }
      })
      .catch(error => {
        console.error('메시지를 가져오는 중 오류 발생:', error);
      });
  };

  const handleGetLiveStart = () => {
    const eventSource = chatRoomAPI.getLiveMessages(getScheduleId, message => {
      setMessages(prevMessages => [...prevMessages, message]);
    });

    eventSource.onerror = function (event) {
      console.error('EventSource failed:', event);
    };

    return eventSource;
  };

  const handleGetUserInfo = async (uid: number) => {
    const userInfo = await getUserInfo(uid, getClassId);
    return userInfo;
  };

  useEffect(() => {
    if (message === '') return;
    chatRoomAPI
      .postMessage(getScheduleId, user.id.toString(), message)
      .then(res => {
        setMessage('');
        console.log(res);
      });
  }, [message]);

  useEffect(() => {
    const fetchChatUsers = async () => {
      const newChatUsers: {[id: string]: UserInfo} = {};
      for (const msg of messages) {
        const [id] = msg.split(': ');
        if (!newChatUsers[id]) {
          newChatUsers[id] = await handleGetUserInfo(Number(id));
        }
      }
      setChatUsers(newChatUsers);
    };

    fetchChatUsers();
  }, [messages]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({behavior: 'smooth'});
    }
  }, [messages]);

  useEffect(() => {
    const eventSource = handleGetLiveStart();
    return () => {
      eventSource.close();
    };
  }, [getScheduleId]);

  useEffect(() => {
    handleGetMessages();
  }, [getScheduleId]);

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="w-full h-full overflow-auto">
        <div className="w-full h-full mt-2">
          <div className="border-4 rounded-lg border-gray-500 p-2 h-full overflow-auto">
            <p className="text-center inline-block px-4 py-2 text-sm text-white bg-violet-300 rounded-lg w-full">
              최상단 채팅 내용입니다
            </p>
            {messages.map((msg, index) => {
              const [id, message] = msg.split(': ');
              const chatUser = chatUsers[id];
              if (!chatUser) {
                return null;
              }
              return (
                <div
                  key={index}
                  className={
                    Number(id) === user.id
                      ? 'flex justify-end items-start'
                      : 'flex justify-start items-start'
                  }
                >
                  {Number(id) !== user.id && (
                    <div className="flex items-center mt-2">
                      <div className="rounded-full w-8 h-8 overflow-hidden max-w-20">
                        <Image
                          src={chatUser.image || user.image}
                          alt={'userImage'}
                          width={40}
                          height={40}
                        />
                      </div>
                      <div className="ml-2">
                        <p>{chatUser.nickname || user.name}</p>
                        <p
                          className={
                            'inline-block px-3 py-2 text-sm text-white bg-gray-500 rounded-lg max-w-72'
                          }
                        >
                          {message}
                        </p>
                      </div>
                    </div>
                  )}
                  {Number(id) === user.id && (
                    <div className="mt-2">
                      <p
                        className={
                          'inline-block px-4 py-2 text-sm text-white bg-blue-400 rounded-lg max-w-72'
                        }
                      >
                        {message}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>
      <div>
        <ChatInput setMsg={setMessage} />
      </div>
    </div>
  );
};

export default ShowMain;
