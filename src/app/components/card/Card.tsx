'use client';
import Image from 'next/image';
import {CardProps} from '@/src/interfaces/group/cardProps';
import icons from '@/public/svgs/group';

const Card = ({
  ImageSrc,
  GroupName,
  GroupContent,
  FavoriteChecked,
}: CardProps) => {
  return (
    <div className="border rounded-lg w-80 h-72 border-gray-300 mr-10 mb-10 hover:shadow-md active:bg-neutral-50 focus:ring focus:ring-gray-400 transform hover:scale-105 transition duration-200 ease-in-out">
      <div className="flex justify-center items-center mt-2">
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
      <div className="flex place-content-between ms-4 mt-2">
        <h3 className="font-bold text-lg">{GroupName}</h3>
        {FavoriteChecked ? (
          <Image
            src={icons.favorite}
            alt="favoriteChecked"
            width={24}
            height={24}
            className="items-center me-2"
          />
        ) : (
          <Image
            src={icons.noneFavorite}
            alt="noneFavoriteChecked"
            width={24}
            height={24}
            className="items-center me-2"
          />
        )}
      </div>
      <p className="text-base ms-4 mt-2 me-2 overflow-hidden overflow-ellipsis whitespace-nowrap">
        {GroupContent}
      </p>
    </div>
  );
};

export default Card;
