import Image from 'next/image';
import Link from 'next/link';
import Profile from './profile';
import {MaterialContainer} from './material';
import icons from '@/public/svgs/navbar';
import '@/src/styles/variable.css';

const Navbar = () => {
  const pages = [
    {name: 'クラス', icon: icons.group, url: '/classes'},
    {name: 'マイページ', icon: icons.myPage, url: '/info'},
    // {name: '문제은행', icon: icons.bank, url: '/bank'},
    /* Billing Page - 保留 */
  ];

  return (
    <div className="w-72 h-screen bg-gray-50">
      <div className="relative w-72 p-6 h-full flex flex-col">
        {/* Profile */}
        <div className="h-14">
          <Profile />
        </div>
        {/* Pages */}
        <div className="w-full py-4">
          <div>
            <p className="text-zinc-400 mb-4">ページ</p>
            <ul className="w-full">
              {pages.map((page, index) => {
                return (
                  <li className="w-full mb-2 py-1" key={index}>
                    <Link href={page.url} className="flex items-center">
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
        {/* Material*/}
        <div
          className="flex-grow"
          style={{
            maxHeight: 'calc(100% - 216px)',
          }}
        >
          <MaterialContainer />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
