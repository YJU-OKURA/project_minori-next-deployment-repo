'use client';

import {useState, useEffect} from 'react';
import Image from 'next/image';
import {DropdownProps} from '@/src/interfaces/group';

const Dropdown = ({
  dropdownImageSrc,
  items,
  setActiveModalId,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handleClick = (event: React.MouseEvent, modalId: string) => {
    event.preventDefault();
    setActiveModalId(modalId);
  };
  useEffect(() => {
    const closeDropdown = (e: MouseEvent) => {
      if (
        (e.target as Element).closest('#dropdown') ||
        (e.target as Element).closest('#dropdownImage')
      )
        return;
      setIsOpen(false);
    };
    document.addEventListener('click', closeDropdown);
    return () => {
      document.removeEventListener('click', closeDropdown);
    };
  }, []);

  return (
    <div className="relative" onClick={() => setIsOpen(!isOpen)}>
      <Image
        id="dropdownImage"
        src={dropdownImageSrc}
        width={70}
        height={70}
        alt={'folder'}
        onClick={toggleDropdown}
      />
      {isOpen && (
        <div
          id="dropdown"
          className="z-10 bg-white divide-y divide-gray-200 rounded-lg shadow-lg w-40 absolute right-0 top-full mt-2 py-2"
        >
          <ul className="text-sm text-gray-700" aria-labelledby="dropdownImage">
            {items.map((item, index) => (
              <li key={index}>
                <button
                  className="block px-4 py-2 hover:bg-gray-200"
                  onClick={event => handleClick(event, item.modalId)}
                >
                  <Image
                    src={item.icon}
                    alt={item.alt}
                    width={20}
                    height={20}
                    className="inline-block me-2"
                  />
                  {item.text}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
