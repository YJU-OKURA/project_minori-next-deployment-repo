'use client';
import {useEffect, useState} from 'react';
import Image from 'next/image';
// import Link from 'next/link';
import {useParams} from 'next/navigation';
import {useRecoilState} from 'recoil';
// import EditName from './EditName';
// import Warning from '../../warning/Warning';
import getClassInfo from '@/src/api/classUser/getClassInfo';
// import putUserName from '@/src/api/classUser/putUserName';
import userState from '@/src/recoil/atoms/userState';
// import icons from '@/public/svgs/navbar';
import gifs from '@/public/gif';

const Profile = () => {
  const params = useParams<{cId: string}>();
  const [imageUrl, setImageUrl] = useState(gifs.eclipse);
  const [userName, setUserName] = useState<string[]>([]);
  const [user, setUser] = useRecoilState(userState);
  // const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  // const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  // const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    setImageUrl(user.image);
    setUserName(user.name.split('#'));
  }, [user]);

  useEffect(() => {
    if (params.cId) {
      getClassInfo(user.id, parseInt(params.cId)).then(res => {
        console.log(res);
        setUser(prevUser => ({
          ...prevUser,
          name: res.nickname,
          role_id: res.role,
        }));
      });
    } else {
      // apiが作られる次第修正予定
      setUser(prevUser => ({
        ...prevUser,
        role_id: undefined,
      }));
    }
  }, [params]);

  // const toggleDropdown = () => {
  //   setDropdownOpen(!dropdownOpen);
  // };

  // const handleEditName = (name: string) => {
  //   setDropdownOpen(false);
  //   putUserName(user.id, parseInt(params.cId), name).then(() => {
  //     setUser(prevUser => ({
  //       ...prevUser,
  //       name: name,
  //     }));
  //   });
  // };

  // const handleClickDelete = () => {
  //   // 追加予定
  //   console.log('class削除処理api 未完成');
  // };

  return (
    // <div className="relative w-full h-14 flex items-start justify-between box-content ">
    //   <div className="relative flex items-center">
    //     <div className="absolute top-6 left-7 w-4 h-4 bg-black rounded-full"></div>
    //     <Image
    //       src={imageUrl || '/images/navbar/user.png'}
    //       width={40}
    //       height={40}
    //       alt="userImage"
    //       className=" rounded-lg object-cover"
    //       priority
    //     />

    //     <div className="w-full mx-3 text-lg font-bold overflow-hidden whitespace-nowrap">
    //       {userName}
    //     </div>
    //   </div>
    //   <button
    //     className="relative w-8 h-8 rounded-lg float-end"
    //     onClick={toggleDropdown}
    //   >
    //     <Image src={icons.moreVert} alt="icon" width={30} height={30}></Image>
    //   </button>
    //   {dropdownOpen && (
    //     <ul className="absolute top-[32px] right-0 bg-white rounded-lg overflow-hidden drop-shadow-lg">
    //       {user.role_id
    //         ? [
    //             <li
    //               key="editName"
    //               className="p-2 hover:bg-gray-200"
    //               onClick={() => {
    //                 setIsEditOpen(true);
    //                 setDropdownOpen(false);
    //               }}
    //             >
    //               名前変更
    //             </li>,
    //             user.role_id === 'ADMIN' ? (
    //               <li
    //                 key="editGroup"
    //                 className="p-2 hover:bg-gray-200"
    //                 onClick={() => {
    //                   setIsOpen(true);
    //                   setDropdownOpen(false);
    //                 }}
    //               >
    //                 クラス修正
    //               </li>
    //             ) : null,
    //             <li
    //               key="deleteOrLeaveGroup"
    //               className="p-2 hover:bg-gray-200"
    //               onClick={() => {
    //                 setIsOpen(true);
    //                 setDropdownOpen(false);
    //               }}
    //             >
    //               {user.role_id === 'ADMIN' ? 'クラス削除' : 'クラス退会'}
    //             </li>,
    //           ]
    //         : null}
    //       <li className="p-2 hover:bg-gray-200">
    //         <Link href="/">ログアウト</Link>
    //       </li>
    //     </ul>
    //   )}

    //   {isOpen ? (
    //     <Warning
    //       purpose="delete"
    //       func={handleClickDelete}
    //       setIsOpen={setIsOpen}
    //     />
    //   ) : null}
    //   {isEditOpen ? (
    //     <EditName setIsOpen={setIsEditOpen} func={handleEditName} />
    //   ) : null}
    // </div>
    <div className="w-full h-full flex items-center">
      <div className="w-[calc(100%-40px)] h-full m-auto gap-4 flex items-center">
        <Image
          src={imageUrl || '/images/navbar/user.png'}
          width={40}
          height={40}
          alt="userImage"
          className="w-11 h-11 m-0.5 rounded-full object-cover"
          priority
        />
        <div className="h-12 whitespace-nowrap overflow-hidden flex flex-col justify-center">
          <p className="text-ml font-bold overflow ">{userName[0]}</p>
          {userName[1] ? (
            <p className="text-sm text-gray-400">#{userName[1]}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Profile;
