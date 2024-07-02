import Image from 'next/image';
import User from '@/src/model/User';
import logos from '@/public/images/_class';
import {ClassPasswordProps} from '@/src/interfaces/_class/modal';

const ClassPassword = ({onClose}: ClassPasswordProps) => {
  return (
    <div id="classPassword" className="fixed z-10 inset-0 overflow-y-auto">
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
                  ようこそ！ {User.name}
                </h3>
                <p className="mt-4 text-sm text-gray-500">
                  クラスのパスワードを入力してください
                </p>
                <div className="mt-4 flex justify-center">
                  <Image
                    src={logos.github}
                    alt={'passwordIntro'}
                    width={300}
                    height={200}
                    className="max-w-80 max-h-72 w-auto h-auto"
                  />
                </div>
              </div>
              <div className="mt-3">
                <form action="">
                  <input
                    className="mt-3 w-full inline-flex justify-center rounded-md border ring-gray-100 shadow-sm px-4 py-2 bg-white-50 text-base font-medium hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-gray-50 focus:ring-gray-100 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    type="text"
                    placeholder="入力クラスのパスワード"
                    required
                  />
                </form>
              </div>
            </div>
          </div>
          <div className="flex px-4 py-3 mb-3 sm:px-6 sm:flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              閉じる
            </button>
            <button
              type="submit"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              提出
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassPassword;
