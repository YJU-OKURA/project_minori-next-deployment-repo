'use client';
import Image from 'next/image';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import MaterialContainer from './material';
import Profile from './profile';
import User from '@/src/model/User';
import icons from '@/public/svgs/navbar';
import '@/src/styles/variable.css';

const Navbar = () => {
  const pages = [
    {name: 'Class', icon: icons.group},
    {name: 'MyPage', icon: icons.mypage},
    /* Billing Page - 保留 */
  ];
  const router = usePathname();

  if (router === '/intro') {
    return null;
  }

  return (
    <div className="absolute left-0 w-72 h-full bg-gray-50">
      <div className="relative w-full px-6 pt-5 navbar flex flex-col">
        {/* Profile */}
        <Profile {...User} />
        <div className="h-px bg-zinc-300"></div>
        <div className="h-8"></div>

        {/* Pages */}
        <div className="w-full">
          <div className="text-zinc-400 mb-4">Pages</div>
          <ul className="w-full">
            {pages.map((page, index) => {
              return (
                <li className="w-full flex mb-3 py-1" key={index}>
                  <Image
                    src={page.icon}
                    alt="icon"
                    width={30}
                    height={30}
                    className="w-6 h-6 mr-3"
                  ></Image>
                  <Link href="/" className="">
                    {page.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="h-8"></div>
        {/* Subject*/}
        <div className="w-full flex-1">
          <div className="text-zinc-400 mb-4">Subject</div>
          <MaterialContainer />
        </div>
        <div className="h-8"></div>

        {/* class exit */}
        <div className="flex py-2">
          <Image
            src={icons.door}
            alt="icon"
            width={30}
            height={30}
            className="w-6 h-6 mr-2"
          ></Image>
          <Link href="/">Leave Class</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
