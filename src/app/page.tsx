'use client';
import {useEffect, useState} from 'react';
import Image from 'next/image';
import {Login} from './components/login';
import intro from '@/public/svgs/intro';
import Cookies from 'js-cookie';

const Page = () => {
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
    Cookies.remove;
    if (typeof window !== 'undefined') {
      document.addEventListener('mousedown', handleOutsideClick);

      localStorage.clear();

      return () => {
        document.removeEventListener('mousedown', handleOutsideClick);
      };
    }
  }, []);
  return (
    <main className="flex h-screen justify-center items-center">
      <div className="text-center">
        <div className="text-5xl font-semibold text-center">
          ミノリで, <br /> <p className="mt-4">学習をより楽しく、より便利に</p>
        </div>
        <div className="m-4 font-semibold text-gray-500">
          学習の利便性を向上させ、楽しい学習体験を満喫してください！
        </div>
        <div>
          <Image
            src={intro.introImg}
            width={500}
            height={500}
            alt="mainImg"
            priority
          />
        </div>
        <button
          onClick={openModal}
          className="bg-indigo-600 text-white py-2 px-7 rounded-3xl"
        >
          ログインする
        </button>
        {isOpen && <Login />}
      </div>
    </main>
  );
};

export default Page;
