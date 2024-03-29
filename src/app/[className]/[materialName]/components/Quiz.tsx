'use client';
import {useState} from 'react';

const Quiz = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div className="py-4">
        <div className="text-lg font-medium p-1">Question</div>
        <div className="border-2 p-5 rounded-lg leading-8">Question</div>
      </div>
      <div className="h-4"></div>
      <div className="">
        <div className="flex justify-between items-center relative py-1">
          <div className="font-medium px-1">Answer</div>
          <div className="">
            <button
              className="border-2 p-2 rounded-lg bg-gray-100 text-sm"
              onClick={toggleDropdown}
            >
              View commentary
            </button>
            {isOpen ? (
              <div className="absolute top-12 right-0 bg-gray-100 w-full p-5 border-2  rounded-lg leading-8 drop-shadow-md">
                <div className="font-semibold">
                  Correct Answer: <span className="text-red-500 ">A</span>
                </div>
                <div className="font-medium pt-2">haesul</div>
              </div>
            ) : null}
          </div>
        </div>
        <ul>
          <li className="py-2">
            <div className="w-full border-2 p-5 rounded-lg text-m">A.</div>
          </li>
          <li className="py-2">
            <div className="w-full border-2 p-5 rounded-lg text-m">B.</div>
          </li>
          <li className="py-2">
            <div className="w-full border-2 p-5 rounded-lg text-m">C.</div>
          </li>
          <li className="py-2">
            <div className="w-full border-2 p-5 rounded-lg text-m">D.</div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Quiz;
