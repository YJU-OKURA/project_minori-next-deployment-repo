'use client';

import React, {useState} from 'react';
import Image from 'next/image';
import getVerifySecret from '@/src/api/classCode/getVerifySecret';
import putUserName from '@/src/api/classUser/putUserName';
import {ModalProps} from '@/src/interfaces/_class/modal';
import icons from '@/public/svgs/_class';

const ClassJoin = ({setActiveModalId, uid, name}: ModalProps) => {
  const [inputValue, setInputValue] = useState('');
  const [password, setPassword] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    if (!inputValue) {
      alert('클래스 코드를 입력해주세요');
      return;
    }
    if (uid && name) {
      try {
        const res = await getVerifySecret(inputValue, password, uid);
        await putUserName(uid, res.cid, name);
        alert('신청 완료되었습니다.');
        setActiveModalId('');
      } catch (error: unknown) {
        alert('잘못된 요청입니다.');
      }
    }
  };

  const handleClose = () => {
    setActiveModalId('');
  };

  return (
    <div id="classJoin" className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div className="inline-block align-bottom bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="items-center">
              <div className="mt-3">
                <h3 className="text-3xl leading-6 font-bold text-gray-900">
                  클래스 가입하기
                </h3>
                <p className="mt-4 text-sm text-gray-500">
                  클래스 코드를 입력하여 가입하세요.
                </p>
                <div className="mt-4 flex justify-center">
                  <Image
                    src={icons.joinIntro}
                    alt={'joinIntro'}
                    width={300}
                    height={200}
                    className="max-w-80 max-h-72 w-auto h-auto"
                  />
                </div>
              </div>
              <div className="mt-3">
                <input
                  className="mt-3 w-full inline-flex justify-center rounded-md border ring-gray-100 shadow-sm px-4 py-2 bg-white-50 text-base font-medium hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-gray-50 focus:ring-gray-100"
                  type="text"
                  placeholder="클래스 코드를 입력해주세요"
                  value={inputValue}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="password"
                  className="mt-3 w-full inline-flex justify-center rounded-md border ring-gray-100 shadow-sm px-4 py-2 bg-white-50 text-base font-medium hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-gray-50 focus:ring-gray-100"
                  placeholder="비밀번호를 입력해주세요"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
            </div>
          </div>
          <div className="flex px-4 py-3 mb-3 sm:px-6 sm:flex justify-between">
            <button
              type="button"
              onClick={handleClose}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              닫기
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              제출
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassJoin;
