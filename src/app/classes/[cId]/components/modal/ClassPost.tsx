import Image from 'next/image';
import {ClassPostProps} from '@/src/interfaces/_class/modal';
import icons from '@/public/svgs/_class';

const ClassPost = ({setShowPostModal, selectedPost}: ClassPostProps) => {
  const handleClose = () => {
    setShowPostModal(false);
  };

  return (
    <div id="postCreate" className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75" />
        </div>
        <span
          className="hidden sm:inline-block align-middle h-screen"
          aria-hidden="true"
        />
        <div className="inline-block align-bottom bg-white text-left shadow-xl transform transition-all my-8 sm:align-middle w-2/5">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div>
              <div className="mt-4">
                <div className="flex justify-center">
                  <p id="title" className="text-center font-bold text-4xl py-2">
                    {selectedPost.Title}
                  </p>
                </div>
                <div className="flex justify-center mt-6">
                  <Image
                    src={selectedPost.Image || icons.noneImage}
                    alt={'Thumbnail'}
                    width={432}
                    height={165}
                  />
                </div>
              </div>
              <div className="flex justify-center mt-12 items-center">
                <p
                  id="content"
                  className="ps-2 pt-2 border border-gray-400 rounded h-28 w-full"
                >
                  {selectedPost.Content}
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-between bg-white px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={handleClose}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassPost;
