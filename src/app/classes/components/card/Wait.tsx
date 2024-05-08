'use client';

import Image from 'next/image';
import {ClassWaitProps} from '@/src/interfaces/_class/modal';

const Wait = ({ImageSrc, ClassName, setModalOpen}: ClassWaitProps) => {
  return (
    <div
      className="border rounded-lg w-80 h-72 overflow-hidden border-gray-300 mr-10 mb-10 hover:shadow-lg active:bg-neutral-50 focus:ring focus:ring-gray-400 transform hover:scale-105 transition duration-200 ease-in-out"
      onClick={() => setModalOpen && setModalOpen(true)}
    >
      <div className="flex justify-center items-center mt-2">
        <div className="w-72 h-44 relative overflow-hidden">
          <Image
            src={ImageSrc}
            alt={'Card Image'}
            fill={true}
            sizes="(max-width: 288px), (max-hight:176px)"
            className="absolute top-0 left-0 w-full h-full object-contain"
          />
        </div>
      </div>
      <div className="flex place-content-between ms-4 mt-2">
        <h3 className="font-semibold text-lg text-violet-500 mb-2">
          {ClassName}
        </h3>
      </div>
    </div>
  );
};

export default Wait;
