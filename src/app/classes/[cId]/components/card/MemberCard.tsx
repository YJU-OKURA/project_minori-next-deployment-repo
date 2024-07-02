'use client';

import {useState} from 'react';
import {useRecoilValue} from 'recoil';
import Image from 'next/image';
import userState from '@/src/recoil/atoms/userState';
import {User} from '@/src/interfaces/user';
import icons from '@/public/svgs/_class/member';

export interface MemberCardProps {
  adminInfo?: Array<{
    id: number;
    image: string;
    nickname: string;
  }>;
  userInfo?: Array<{
    id: number;
    image: string;
    nickname: string;
  }>;
  assistantInfo?: Array<{
    id: number;
    image: string;
    nickname: string;
  }>;
  applicantInfo?: Array<{
    id: number;
    image: string;
    nickname: string;
  }>;
}

const MemberCard = ({
  adminInfo,
  userInfo,
  assistantInfo,
  applicantInfo,
}: MemberCardProps) => {
  const combinedUsers = [
    ...(adminInfo?.map(user => ({...user, role: 'ADMIN'})) || []),
    ...(userInfo?.map(user => ({...user, role: 'USER'})) || []),
    ...(assistantInfo?.map(user => ({...user, role: 'ASSISTANT'})) || []),
    ...(applicantInfo?.map(user => ({...user, role: 'APPLICANT'})) || []),
  ];
  const loginUser = useRecoilValue(userState) as User;
  const [selectedRole, setSelectedRole] = useState(loginUser.role_id);

  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRole(event.target.value);
  };

  return (
    <div className="w-11/12 mt-2 mb-4">
      {combinedUsers.map(user => (
        <div
          key={user.id}
          className="border h-16 flex items-center mb-2 w-full"
          style={{background: '#1C1F3B', borderRadius: '18px'}}
        >
          <div className="ps-4 flex w-full items-center">
            <Image
              src={user.image}
              alt={'profile'}
              width={35}
              height={35}
              className="border border-none rounded-full"
            />
            {user.role === 'ADMIN' && (
              <Image
                src={icons.admin}
                alt={'admin'}
                width={20}
                height={20}
                className="border border-none rounded-full z-10 -ms-4 mt-6"
              />
            )}
            {user.role === 'ASSISTANT' && (
              <Image
                src={icons.assistant}
                alt={'assistant'}
                width={20}
                height={20}
                className="border border-none rounded-full z-10 -ms-4 mt-6"
              />
            )}
            <p className="ms-4 text-white text-lg">{user.nickname}</p>
          </div>
          <div className="w-full pe-4">
            {loginUser.role_id === 'ADMIN' &&
              user.role !== 'ADMIN' &&
              user.role !== 'APPLICANT' && (
                <div className="flex justify-end">
                  <select
                    value={selectedRole}
                    onChange={handleRoleChange}
                    className="bg-white font-semibold text-black py-1 px-2 rounded hover:bg-gray-200"
                  >
                    <option value="USER" selected={user.role === 'USER'}>
                      USER
                    </option>
                    <option
                      value="ASSISTANT"
                      selected={user.role === 'ASSISTANT'}
                    >
                      ASSISTANT
                    </option>
                    <option
                      value="BLACKLIST"
                      selected={user.role === 'BLACKLIST'}
                    >
                      BLACKLIST
                    </option>
                  </select>
                  <button className="bg-white font-semibold text-black py-1 px-2 rounded hover:bg-gray-200 ml-2">
                    権限の変更
                  </button>
                </div>
              )}
          </div>
          {user.role === 'APPLICANT' && (
            <div className="flex justify-end w-full me-8">
              <p className="me-2">✅</p>
              <p>❌</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MemberCard;
