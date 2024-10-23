// import Image from 'next/image';
// import Link from 'next/link';
// import Profile from './profile';
// import {MaterialContainer} from './material';
// import icons from '@/public/svgs/navbar';
// import '@/src/styles/variable.css';
'use client';
import {useEffect, useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {MaterialContainer} from './material';
import Profile from './profile/Profile';
import icons from '@/public/svgs/navbar';
import {useParams} from 'next/navigation';

const Navbar = () => {
  const [isClick, setIsClick] = useState<boolean>(false);
  const [baseSize, setBaseSize] = useState<number>(288);
  const [width, setWidth] = useState<number>(0);
  const pages = [
    {name: 'クラス', icon: icons.group, url: '/classes'},
    {name: 'マイページ', icon: icons.myPage, url: '/info'},
    {name: '問題銀行', icon: icons.myPage, url: '/bank'},
    /* Billing Page - 保留 */
  ];
  const param = useParams<{cId: string; mId: string}>();

  const handleMouseDown = (e: React.MouseEvent) => {
    console.log('down');
    e.preventDefault();
    setIsClick(true);
    setWidth(e.clientX);
  };

  const handleMouseUp = () => {
    console.log('up');
    setIsClick(false);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isClick) {
      const newWidth = baseSize + e.clientX - width;
      setWidth(e.clientX);

      if (200 <= newWidth && newWidth <= 400) {
        setBaseSize(newWidth);
      }
    }
  };

  useEffect(() => {
    if (isClick) {
      // 마우스 클릭 시, document 수준에서 이벤트가 처리되도록 추가
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      // 마우스 해제 시, 이벤트 제거
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }

    // 이벤트가 발생하지 않을떄, 이벤트 제거
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isClick]);

  return (
    //18.5rem - sidebar-18rem, border-0.5rem
    <div className="flex">
      <div
        style={{width: `${baseSize}px`}}
        className={
          'relative h-screen flex flex-col bg-white drop-shadow-xl overflow-hidden'
        }
      >
        <div className="h-24 flex-none border-b-2">
          <Profile />
        </div>
        <div className="flex-grow flex flex-col items-between text-lg">
          <div className="grid gap-3 py-3">
            {pages.map((page, index) => {
              return (
                <Link
                  className="w-[calc(100%-40px)] flex items-center m-auto gap-4"
                  key={index}
                  href={page.url}
                >
                  <Image
                    src={page.icon}
                    alt="icon"
                    width={30}
                    height={30}
                    className="w-10 h-10 m-1 opacity-80"
                  ></Image>
                  <div>{page.name}</div>
                </Link>
              );
            })}
          </div>
          {/* material */}
          <MaterialContainer cId={param.cId} mId={param.mId} />
        </div>
        <div className="h-36 border-t-2 flex-none">
          <div className="w-[calc(100%-40px)] h-full flex flex-col justify-center m-auto gap-3">
            <div className="flex items-center gap-4">
              <Image
                src={icons.notion}
                alt="icon"
                width={25}
                height={25}
                className="w-10 h-10 m-1"
              />
              <div>ノーション</div>
            </div>
            <Link
              href={param.mId ? `/classes/${param.cId}` : '/classes'}
              className="flex items-center gap-4"
            >
              <Image
                src={icons.door}
                alt="icon"
                width={30}
                height={30}
                className="w-10 h-10 m-1 opacity-80"
              />
              <div>戻る</div>
            </Link>
          </div>
        </div>
      </div>
      <div
        onMouseDown={handleMouseDown}
        // onMouseUp={handleMouseUp}
        // onMouseMove={handleMouseMove}
        className="w-1 h-screen bg-gray-200 cursor-col-resize"
      ></div>
    </div>
  );
};

export default Navbar;
