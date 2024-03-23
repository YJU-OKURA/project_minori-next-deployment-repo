'use client';

import {useState} from 'react';
import Image from 'next/image';
import {ModalProps} from '@/src/interfaces/group/modal';
import icons from '@/public/svgs/group';

const ClassCreate = ({setActiveModalId}: ModalProps) => {
  const [isPasswordEnabled, setIsPasswordEnabled] = useState(false);
  const [fileDataUrl, setFileDataUrl] = useState<string | null>(null);
  const handleCheckboxChange = () => {
    setIsPasswordEnabled(!isPasswordEnabled);
  };
  const handleClose = () => {
    setActiveModalId('');
  };
  const passwordPlaceholder = isPasswordEnabled
    ? 'Input password'
    : 'Check the Password box!';
  const [dragging, setDragging] = useState(false);
  const handleDragIn = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setDragging(true);
    }
  };

  const handleDragOut = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFileDataUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
      e.dataTransfer.clearData();
    }
  };

  const handleFileChange = () => {
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    const file = fileInput?.files?.[0];
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      setFileDataUrl(reader.result as string);
    });
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div id="classCreate" className="fixed z-10 inset-0 overflow-y-auto">
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
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-3xl leading-6 font-bold text-gray-900">
                  Create Class
                </h3>
                <form action="">
                  <div className="mt-6">
                    <p className="text-lg font-semibold">Thumbnail</p>
                    <div
                      onDragEnter={handleDragIn}
                      onDragLeave={handleDragOut}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                      className={`border-dotted h-48 rounded-lg border-dashed border-2 border-blue-700 bg-gray-100 flex justify-center items-center ${
                        dragging ? 'bg-red-200' : ''
                      }`}
                    >
                      <div className="absolute">
                        <div className="flex flex-col items-center">
                          {fileDataUrl ? (
                            <Image
                              src={fileDataUrl}
                              alt={'thumbnail'}
                              width={200}
                              height={200}
                              className="w-auto h-auto max-w-52 max-h-40 mt-4"
                            />
                          ) : (
                            <Image
                              className="opacity-30"
                              src={icons.thumbnail}
                              alt={'thumbnail'}
                              width={72}
                              height={72}
                            />
                          )}
                          <span className="block text-gray-400 font-normal mb-2">
                            Attach you files here
                          </span>
                        </div>
                      </div>
                      <input
                        type="file"
                        className="h-full w-full opacity-0"
                        onChange={handleFileChange}
                      />
                    </div>
                  </div>
                  <div className="mt-6">
                    <div className="flex justify-between px-1">
                      <div className="items-start">
                        <p className="text-lg font-semibold">
                          Class Name <span className="text-red-600">*</span>
                        </p>
                        <input
                          type="text"
                          className="ps-2 border border-gray-400 rounded h-8"
                          required
                        />
                      </div>
                      <div className="items-start">
                        <p className="text-lg font-semibold">
                          User Capacity <span className="text-red-600">*</span>
                        </p>
                        <div className="relative inline-block text-left">
                          <select
                            className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            id="menu-button"
                            required
                          >
                            <option value="">Select Capacity</option>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="30">30</option>
                            <option value="40">40</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <div className="items-start">
                      <p className="text-lg font-semibold">Class Password</p>
                      <div className="flex justify-between items-center pe-2">
                        <input
                          type="password"
                          className="ps-2 border border-gray-400 rounded h-8 w-3/5"
                          placeholder={passwordPlaceholder}
                          disabled={!isPasswordEnabled}
                        />
                        <span className="text-lg">
                          <input
                            type="checkbox"
                            className="me-1 size-4"
                            onChange={handleCheckboxChange}
                          />
                          Password
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <div className="items-start">
                      <p className="text-lg font-semibold">
                        Class Introduction{' '}
                        <span className="text-red-600">*</span>
                      </p>
                      <div className="flex justify-between items-center pe-2">
                        <textarea
                          className="ps-2 pt-2 border border-gray-400 rounded h-28 w-full"
                          placeholder="Please input class introduction"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="bg-white px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="submit"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Create
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassCreate;
