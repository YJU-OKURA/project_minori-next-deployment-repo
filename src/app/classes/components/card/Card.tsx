'use client';
import Image from 'next/image';
import Link from 'next/link';
import {CardItemProps} from '@/src/interfaces/_class';
import icons from '@/public/svgs/_class';
import logos from '@/public/images/_class';

const Card: React.FC<CardItemProps> = ({classData}) => {
  const cardContent = (
    <>
      <div className="border rounded-lg w-80 h-72 border-gray-300 mr-10 mb-10 hover:shadow-md active:bg-neutral-50 focus:ring focus:ring-gray-400 transform hover:scale-105 transition duration-200 ease-in-out">
        <div className="flex justify-center items-center mt-2">
          <div className="w-72 h-44 relative overflow-hidden">
            <Image
              src={classData.ImageSrc || logos.yeungjin}
              alt={'Card Image'}
              fill={true}
              sizes="(max-width: 288px), (max-hight:176px)"
              className="absolute top-0 left-0 w-full h-full object-contain"
            />
          </div>
        </div>
        <div className="flex place-content-between ms-4 mt-2">
          <h3 className="font-bold text-lg">{classData.ClassName}</h3>
          {classData.disableLink ? null : (
            <>
              {classData.FavoriteChecked ? (
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
            </>
          )}
        </div>
        <p className="text-base ms-4 mt-2 me-2 overflow-hidden overflow-ellipsis whitespace-nowrap">
          {classData.ClassContent}
        </p>
      </div>
    </>
  );

  return (
    <>
      {classData.disableLink ? (
        cardContent
      ) : (
        <Link
          href={{
            pathname: `/classes/${classData.ClassId}`,
          }}
        >
          {cardContent}
        </Link>
      )}
    </>
  );
};

export default Card;
