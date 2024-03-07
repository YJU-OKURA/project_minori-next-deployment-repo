'use client';
import Image from 'next/image';
import Link from 'next/link';
import {CardProps} from '@/src/interfaces/group';
import icons from '@/public/svgs/group';

const Card = ({
  ImageSrc,
  ClassName,
  ClassContent,
  FavoriteChecked,
}: CardProps) => {
  return (
    <Link href={`/${ClassName}`}>
      <div className="border rounded-lg w-80 h-72 border-gray-300 mr-10 mb-10 hover:shadow-md active:bg-neutral-50 focus:ring focus:ring-gray-400 transform hover:scale-105 transition duration-200 ease-in-out">
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
          <h3 className="font-bold text-lg">{ClassName}</h3>
          {FavoriteChecked ? (
            <Image
              src={icons.favorite}
              alt="favoriteChecked"
              width={24}
              height={24}
              className="items-center me-2 h-6"
            />
          ) : (
            <Image
              src={icons.noneFavorite}
              alt="noneFavoriteChecked"
              width={24}
              height={24}
              className="items-center me-2 h-6"
            />
          )}
        </div>
        <p className="text-base ms-4 mt-2 me-2 overflow-hidden overflow-ellipsis whitespace-nowrap">
          {ClassContent}
        </p>
      </div>
    </Link>
  );
};

export default Card;
