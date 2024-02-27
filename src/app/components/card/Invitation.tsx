'use client';

import Image from 'next/image';
import {InvitationProps} from '@/src/interfaces/group/invitationProps';

const Invitation = ({ImageSrc, GroupName, ManagerName}: InvitationProps) => {
  return (
    <div className="border rounded-lg w-80 h-72 overflow-hidden border-gray-300 mr-10 mb-10 hover:shadow-lg active:bg-neutral-50 focus:ring focus:ring-gray-400 transform hover:scale-105 transition duration-200 ease-in-out">
      <div className="flex justify-center items-center">
        <div className="w-72 h-44 relative overflow-hidden">
          <Image
            src={ImageSrc}
            alt={'Card Image'}
            priority={true}
            layout="fill"
            objectFit="contain"
          />
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg text-violet-500 mb-2">
          {GroupName}
        </h3>
        <p className="text-base text-gray-700">
          Invited by{' '}
          <span className="font-semibold text-rose-500">{ManagerName}</span>
        </p>
      </div>
    </div>
  );
};

export default Invitation;
