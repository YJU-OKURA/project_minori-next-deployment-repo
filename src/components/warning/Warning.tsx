import Image from 'next/image';
import {errorProps} from '@/src/interfaces/error';
import errorIcon from '@/public/svgs/error';

// purpose - 目的、 func - 実行させる関数, setIsOpen - モーダルを閉じる関数
const Warning = ({purpose, func, setIsOpen}: errorProps) => {
  const errorMsg = {
    delete: 'Are you sure you want to delete',
    leave: 'Are you sure you want to leave',
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        className=" bg-white rounded-lg w-[400px] h-[250px] py-[30px] box-border flex items-center"
        id="modal-container"
      >
        <div className="w-full h-[180px] text-center ">
          <div className="h-[130px]">
            <div className="flex justify-center py-[3px]">
              <Image src={errorIcon.error} width={60} height={60} alt="error" />
            </div>
            <div className="py-[2px]">
              <div className="w-full text-3xl font-semibold">Waring</div>
              <span className="text-gray-400">{errorMsg[purpose]}</span>
            </div>
          </div>

          <div className="w-full h-[50px] flex justify-center items-end px-10">
            <button
              className="bg-blue-500 text-white py-2 px-3 rounded text-sm font-medium mx-2"
              onClick={func}
            >
              Delete
            </button>
            <button
              className="bg-red-500 text-white py-2 px-3 rounded text-sm font-medium mx-2"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Warning;
