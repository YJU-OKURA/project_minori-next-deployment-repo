import {useState} from 'react';
import Image from 'next/image';
import icons from '@/public/svgs/prompt';

const MaterialForm = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-500 w-6 h-6 flex justify-center items-center rounded-lg "
      >
        <Image src={icons.plus} width={18} height={18} alt="icon" />
      </div>
      {isOpen ? (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
          <div className=" bg-white rounded-lg w-2/5 h-3/4 py-10 box-border">
            <div className="w-full h-full flex box-border px-10">
              <div className="flex flex-col space-y-4 h-full w-full">
                <div>
                  <div className="text-3xl font-bold">Make Prompt</div>
                  <div className="text-gray-500 py-1">
                    After you put in the file, you will get a prompt that says
                    you have learned the file.
                  </div>
                </div>
                <div className="py-1">
                  <div className="pb-2 font-semibold">Enter Prompt Name</div>
                  <input
                    type="text"
                    className="w-full border-2 p-2 rounded"
                    placeholder="prompt name"
                  />
                </div>
                <div className="flex flex-col h-2/3">
                  <div className="pb-2 font-semibold">Enter Your File</div>
                  <div className="w-full h-2/3 flex items-center justify-center bg-gray-50 text-center p-8 border-dashed border-2 border-gray-300">
                    <div>
                      <div className="pb-4">
                        <Image
                          src={icons.cloud}
                          alt="cloud"
                          width={60}
                          height={60}
                          className="m-auto "
                        />
                      </div>
                      <div className="font-medium">
                        Drag & drop files or Browse
                      </div>
                      <div className="text-xs text-gray-400">
                        Supported formates: PDF, Word, PPT
                      </div>
                      {/* <input type="file" /> */}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between text-sm font-medium">
                  <button
                    className="bg-gray-100 py-2 px-4  rounded"
                    onClick={() => setIsOpen(false)}
                  >
                    {'< '}Back
                  </button>
                  <button className="bg-indigo-600 text-white py-2 px-3 rounded">
                    Make Prompt
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default MaterialForm;
