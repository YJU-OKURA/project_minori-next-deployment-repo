import {useEffect, useState} from 'react';
import Image from 'next/image';
import {useRouter} from 'next/navigation';
import {useRecoilState, useRecoilValue} from 'recoil';
import EditName from './EditName';
import Warning from '../../warning/Warning';
import getClassInfo from '@/src/api/classUser/getClassInfo';
import putUserName from '@/src/api/classUser/putUserName';
import classUserState from '@/src/recoil/atoms/classUserState';
import userState from '@/src/recoil/atoms/userState';
import {ParamsProps} from '@/src/interfaces/navbar';
import icons from '@/public/svgs/navbar';
import ROLES from '@/src/constants/roles';

const Profile = ({cId, params}: {cId: string | null; params: ParamsProps}) => {
  const router = useRouter();
  const user = useRecoilValue(userState);
  const [classUser, setClassUser] = useRecoilState(classUserState);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (cId && !classUser) {
      getClassInfo(user.id, parseInt(cId)).then(res => {
        console.log(res);
        setClassUser(res);
      });
    }
    if (!params.className) {
      setClassUser(null);
    }
  }, [cId, classUser, params]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
    console.log(params);
  };

  const handleEditName = (name: string) => {
    setDropdownOpen(false);
    if (classUser) putUserName(classUser.uid, 4, name);
  };

  const handleClickDelete = () => {
    // 追加予定
    console.log('class削除処理api 未完成');
  };

  const handleClickLogout = () => {
    router.push('/intro');
  };

  return (
    <div className="relative w-full h-12 flex items-start justify-between box-content ">
      <div className="flex items-center">
        <Image
          src={user ? user.image : ''}
          width={10}
          height={10}
          alt="userImage"
          className="w-8 h-8 rounded-lg object-cover"
        />

        <div className="mx-2">
          {classUser ? classUser.nickname : user ? user.name : ''}
        </div>
      </div>
      <button
        className="relative w-8 h-8 rounded-lg float-end"
        onClick={toggleDropdown}
      >
        <Image src={icons.moreVert} alt="icon" width={30} height={30}></Image>
      </button>
      {dropdownOpen && (
        <ul className="absolute top-[32px] right-0 bg-white rounded-lg overflow-hidden drop-shadow-lg">
          {classUser ? (
            <>
              <li
                className="p-2 hover:bg-gray-200"
                onClick={() => {
                  setIsEditOpen(true);
                  setDropdownOpen(false);
                }}
              >
                Edit Name
              </li>
              {ROLES[classUser.role_id] === 'ADMIN' ? (
                <li
                  className="p-2 hover:bg-gray-200"
                  onClick={() => {
                    setIsOpen(true);
                    setDropdownOpen(false);
                  }}
                >
                  Edit group
                </li>
              ) : null}
              <li
                className="p-2 hover:bg-gray-200"
                onClick={() => {
                  setIsOpen(true);
                  setDropdownOpen(false);
                }}
              >
                {ROLES[classUser.role_id] === 'ADMIN'
                  ? 'Delete group'
                  : 'Leave group'}
              </li>
            </>
          ) : null}
          <li className="p-2 hover:bg-gray-200" onClick={handleClickLogout}>
            Logout
          </li>
        </ul>
      )}

      {isOpen ? (
        <Warning
          purpose="delete"
          func={handleClickDelete}
          setIsOpen={setIsOpen}
        />
      ) : null}
      {isEditOpen ? (
        <EditName setIsOpen={setIsEditOpen} func={handleEditName} />
      ) : null}
    </div>
  );
};

export default Profile;
