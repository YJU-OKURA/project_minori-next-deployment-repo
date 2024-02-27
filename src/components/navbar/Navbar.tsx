'use client';
import Image from 'next/image';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import test from '@/public/images/navbar';
import icons from '@/public/svgs/navbar';

const Navbar = () => {
  const router = usePathname();

  if (router === '/intro') {
    return null;
  }

  return (
    <div className="w-72">
      <div className="relative w-full h-screen bg-gray-50 px-6">
        {/* Profile */}
        <div className="w-full h-12 flex items-center justify-between box-content py-1">
          <div className="flex items-center">
            <Image
              src={test.user}
              width={10}
              height={10}
              alt="userImage"
              className="w-8 h-8 rounded-lg"
            />
            <div className="mx-2">Name</div>
          </div>
          <button className="w-8 h-8 rounded-lg float-end">
            <Image
              src={icons.moreVert}
              alt="icon"
              width={30}
              height={30}
            ></Image>
          </button>
        </div>
        <div className="h-px bg-zinc-300"></div>
        <div className="h-8"></div>

        {/* Pages */}
        <div className="w-full">
          <div className="text-zinc-400 mb-4">Pages</div>
          <ul className="w-full">
            <li className="w-full flex mb-3 py-1">
              <Image
                src={icons.group}
                alt="icon"
                width={30}
                height={30}
                className="w-6 h-6 mr-3"
              ></Image>
              <Link href="/" className="">
                Group
              </Link>
            </li>
            <li className="w-full flex mb-3 py-1">
              <Image
                src={icons.mypage}
                alt="icon"
                width={30}
                height={30}
                className="w-6 h-6 mr-3"
              ></Image>
              <Link href="/" className="">
                MyPage
              </Link>
            </li>
            {/* Billing Page - 보류 */}
            {/* <li className="w-full flex my-2 py-2">
          <div className="w-6 h-6 bg-gray-600 mr-3"></div>
          <Link href="/" className="">
          Billing
          </Link>
        </li> */}
          </ul>
        </div>
        <div className="h-8"></div>
        {/* Prompt */}
        <div className="w-full h-1/2">
          <div className="text-zinc-400 mb-4">Prompt</div>
          {/* prompt - search */}
          <div className="w-full flex bg-white items-center mb-3 px-1">
            <Image
              src={icons.search}
              alt="icon"
              width={20}
              height={20}
              className="w-5 h-5 opacity-50"
            />
            <input
              type="text"
              className="w-full p-1 border-0 outline-none"
              placeholder="Search"
            />
          </div>
          {/* Prompt - list */}
          <ul>
            <li className="flex mb-3 py-1 items-center">
              <Image
                src={icons.book}
                alt="prompt"
                width={15}
                height={15}
                className="w-6 h-6 mr-3"
              ></Image>
              <div className="flex w-full items-center justify-between">
                <Link href="/" className="">
                  prompt1
                </Link>
                <Image
                  src={icons.moreHoriz}
                  alt="icon"
                  width={30}
                  height={30}
                ></Image>
              </div>
            </li>
          </ul>
        </div>

        {/* group exit */}
        <div className="flex absolute bottom-12">
          <Image
            src={icons.door}
            alt="icon"
            width={30}
            height={30}
            className="w-6 h-6 mr-2"
          ></Image>
          <div>그룹 나가기</div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
