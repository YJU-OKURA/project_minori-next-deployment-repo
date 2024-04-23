'use client';
import {useEffect, useState} from 'react';
import Image from 'next/image';
import {Login} from './components/login';
import intro from '@/public/svgs/intro';
import {useSetRecoilState} from 'recoil';
import userState from '@/src/recoil/atoms/userState';

const Page = () => {
  const setUser = useSetRecoilState(userState);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    const modalContainer = document.getElementById('modal-container');
    if (modalContainer && !modalContainer.contains(event.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);

    setUser(null);
    localStorage.clear();

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="text-5xl font-semibold text-center">
        Make your collateral more efficient, <br /> more accessible.
      </div>
      <div className="m-4 font-semibold text-gray-500">
        Minori makes it easier and more efficient to analyze data with LLM.
      </div>
      <div>
        <Image src={intro.introImg} width={500} height={500} alt="mainImg" />
      </div>
      <button
        onClick={openModal}
        className="bg-indigo-600 text-white py-2 px-7 rounded-3xl"
      >
        Get Start
      </button>
      {isOpen && <Login />}
    </main>
  );
};

export default Page;
