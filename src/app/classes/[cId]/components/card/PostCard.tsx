import {useState} from 'react';
import Image from 'next/image';
import {ClassEditPost} from '../modal';
import {Dropdown} from '@/src/app/classes/components/_class/dropdown';
import {PostCardProps} from '@/src/interfaces/_class';
import icons from '@/public/svgs/_class';

const PostCard = ({
  imageSrc,
  postName,
  managerRole,
  zIndex,
  postId,
  deletePost,
}: PostCardProps & {zIndex: number} & {
  deletePost: (postId: number) => void;
}) => {
  const dropdownItems = [
    {
      modalId: '投稿の修正',
      icon: icons.edit,
      alt: 'Edit Icon',
      text: '修正',
    },
    {
      modalId: '投稿の削除',
      icon: icons.delete,
      alt: 'Delete Icon',
      text: '削除',
    },
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedModalId, setSelectedModalId] = useState<string | null>(null);

  const setActiveModalId = (modalId: string) => {
    setSelectedModalId(modalId);
    setIsModalOpen(true);
    if (modalId === '投稿の削除') {
      deletePost(postId);
    }
  };

  return (
    <div
      className="border rounded-lg h-44 border-gray-300 mr-2 mb-6 hover:shadow-md active:bg-neutral-50 focus:ring focus:ring-gray-400 transform hover:scale-105 transition duration-200 ease-in-out"
      style={{zIndex}}
    >
      <div className="flex justify-center items-center mt-2">
        <div className="mt-2 w-80 h-24 relative overflow-hidden">
          <Image
            src={imageSrc || icons.noneImage}
            alt={'Thumbnail'}
            fill={true}
            sizes="(max-width: 200px), (max-hight:78px)"
            className="absolute top-0 left-0 w-full h-full object-contain"
          />
        </div>
      </div>
      <div className="flex items-center ms-4 mt-4">
        <Image
          src={icons.post}
          alt={'post'}
          width={0}
          height={0}
          className="me-2 w-auto h-auto max-w-5 max-h-5"
        />
        <div className="flex w-full justify-between">
          <h3 className="font-bold text-lg">{postName}</h3>
          {managerRole && (
            <>
              <div style={{width: 30, height: 30}}>
                <Dropdown
                  dropdownImageSrc={icons.moreVert}
                  items={dropdownItems}
                  setActiveModalId={setActiveModalId}
                  zIndex={zIndex}
                />
              </div>
            </>
          )}
        </div>
      </div>
      {isModalOpen && selectedModalId === '投稿の修正' && <ClassEditPost />}
    </div>
  );
};

export default PostCard;
