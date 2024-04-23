import {ChangeEvent, useEffect, useRef, useState} from 'react';
import Image from 'next/image';
import postMaterial from '@/src/api/material/postMaterial';
import {FormProps} from '@/src/interfaces/navbar';
import icons from '@/public/svgs/navbar/prompt';

const MaterialForm = ({setIsOpen, editData}: FormProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [materialName, setMaterialName] = useState<string>('');
  const [material, setMaterial] = useState<File>();

  useEffect(() => {
    if (editData) {
      console.log(editData);
    }
  }, []);

  const handleEnterName = (e: ChangeEvent<HTMLInputElement>) => {
    setMaterialName(e.target.value);
  };

  const handleClickInput = () => {
    inputRef.current?.click();
  };

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (file) {
      setMaterial(file[0]);
      // postMaterial(1, materialName, file[0]);
    }
  };

  const handleClickButton = () => {
    console.log(material, materialName);
    if (material && materialName) {
      postMaterial(4, materialName, material);
    }
  };

  return (
    <div>
      <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
        <div className=" bg-white rounded-lg w-2/5 h-3/4 py-10 box-border">
          <div className="w-full h-full flex box-border px-10">
            <div className="flex flex-col space-y-4 h-full w-full">
              <div>
                <div className="text-3xl font-bold">Make Prompt</div>
                <div className="text-gray-500 py-1">
                  After you put in the file, you will get a prompt that says you
                  have learned the file.
                </div>
              </div>
              <div className="py-1">
                <div className="pb-2 font-semibold">Enter Prompt Name</div>
                <input
                  type="text"
                  className="w-full border-2 p-2 rounded"
                  placeholder="prompt name"
                  onChange={handleEnterName}
                />
              </div>
              <div className="flex flex-col h-2/3">
                <div className="pb-2 font-semibold">Enter Your File</div>
                <div
                  className="w-full h-2/3 flex items-center justify-center bg-gray-50 text-center p-8 border-dashed border-2 border-gray-300"
                  onClick={handleClickInput}
                >
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
                    <input
                      type="file"
                      className="hidden"
                      ref={inputRef}
                      onChange={handleChangeInput}
                    />
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
                <button
                  className="bg-indigo-600 text-white py-2 px-3 rounded"
                  onClick={handleClickButton}
                >
                  Make Prompt
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialForm;
