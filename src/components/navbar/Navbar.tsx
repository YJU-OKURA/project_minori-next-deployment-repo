import Image from 'next/image';
import Link from 'next/link';
import Profile from './profile';
import {MaterialContainer} from './material';
import icons from '@/public/svgs/navbar';
import '@/src/styles/variable.css';

const Navbar = () => {
  const pages = [
    {name: '클래스', icon: icons.group, url: '/classes'},
    {name: '내정보', icon: icons.myPage, url: '/info'},
    {name: '문제은행', icon: icons.myPage, url: '/bank'},
    /* Billing Page - 保留 */
  ];

  return (
    <div className="w-72 h-full bg-gray-50">
      <div className="relative w-72 p-6 h-full flex flex-col">
        {/* Profile */}
        <Profile />
        <div className="h-8"></div>
        {/* Pages */}
        <div className="w-full">
          <div>
            <p className="text-zinc-400 mb-4">페이지</p>
            <ul className="w-full">
              {pages.map((page, index) => {
                return (
                  <li className="w-full mb-2 py-1" key={index}>
                    <Link href={page.url} className="flex">
                      <Image
                        src={page.icon}
                        alt="icon"
                        width={30}
                        height={30}
                        className="w-8 h-8 mr-3"
                      ></Image>
                      {page.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="h-8"></div>
        {/* Material*/}
        <div className="flex-grow">
          <MaterialContainer />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
