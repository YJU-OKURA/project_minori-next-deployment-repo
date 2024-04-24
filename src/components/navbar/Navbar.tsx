'use client';
import {useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {useParams, usePathname} from 'next/navigation';
import {MaterialContainer, MaterialForm} from './material';
import Profile from './profile';
import icons from '@/public/svgs/navbar';
import '@/src/styles/variable.css';
import classUserState from '@/src/recoil/atoms/classUserState';
import {useRecoilValue} from 'recoil';
import ROLES from '@/src/constants/roles';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const classUser = useRecoilValue(classUserState);

  const pages = [
    {name: 'Class', icon: icons.group},
    {name: 'MyPage', icon: icons.mypage},
    {name: 'QuizBank', icon: icons.mypage},
    /* Billing Page - 保留 */
  ];

  const router = usePathname();
  const params = useParams<{className: string; materialName: string}>();
  // const searchParams = useSearchParams();
  // const search = searchParams.get('id');
  const search = '4';

  if (router === '/intro' || router === '/intro/googleLogin') {
    return null;
  }

  return (
    <div className="w-72 h-full bg-gray-50">
      <div className="relative w-72 px-6 pt-5 navbar flex flex-col">
        {/* Profile */}
        <Profile params={params} cId={search} />
        <div className="pt-2 border-b border-gray-300"></div>
        <div className="h-8"></div>

        {/* Pages */}
        <div className="w-full">
          <div className="text-zinc-400 mb-4">Pages</div>
          <ul className="w-full">
            {pages.map((page, index) => {
              return (
                <li className="w-full mb-3 py-1" key={index}>
                  <Link href="/" className=" flex">
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
        <div className="h-8"></div>

        {/* Subject*/}
        {params.className ? (
          <>
            <div className="w-full flex-1">
              <div className="flex justify-between items-center mb-4">
                <div className="text-zinc-400">Material</div>
                {/* <MaterialForm /> */}
                {classUser && ROLES[classUser?.role_id] === 'ADMIN' ? (
                  <div
                    onClick={() => setIsOpen(true)}
                    className="bg-blue-500 w-6 h-6 flex justify-center items-center rounded-lg "
                  >
                    <Image
                      src={icons.plus}
                      width={0}
                      height={0}
                      alt="plus"
                      className="m-auto w-auto h-auto max-w-5 max-h-5"
                    />
                  </div>
                ) : null}
                {isOpen && search ? (
                  <MaterialForm setIsOpen={setIsOpen} cId={search} />
                ) : null}
              </div>
              <MaterialContainer params={params} cId={search} />
            </div>
            <div className="h-16"></div>

            {/* class exit */}
            <div className="flex py-2">
              <Image
                src={icons.door}
                alt="icon"
                width={30}
                height={30}
                className="w-6 h-6 mr-2"
              ></Image>
              {params.materialName ? (
                <Link href={`/${params.className}`}>Leave Prompt</Link>
              ) : (
                <Link href="/">Leave Class</Link>
              )}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Navbar;
