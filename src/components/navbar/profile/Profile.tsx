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
  const [load, setLoad] = useState<boolean>(false);

  useEffect(() => {
    if (cId && !classUser) {
      getClassInfo(user.id, parseInt(cId)).then(res => {
        setClassUser(res);
      });
    }
    if (!params.className) {
      setClassUser(null);
    }
    setLoad(true);
  }, []);

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
    router.push('/');
  };

  return (
    <div className="relative w-full h-12 flex items-start justify-between box-content ">
      <div className="flex items-center">
        {load ? (
          <Image
            src={user ? user.image : ''}
            width={10}
            height={10}
            alt="userImage"
            className="w-8 h-8 rounded-lg object-cover"
          />
        ) : null}

        <div className="mx-2">
          {load
            ? classUser
              ? classUser.nickname
              : user
              ? user.name
              : ''
            : null}
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
          {classUser
            ? [
                <li
                  key="editName"
                  className="p-2 hover:bg-gray-200"
                  onClick={() => {
                    setIsEditOpen(true);
                    setDropdownOpen(false);
                  }}
                >
                  이름 변경
                </li>,
                ROLES[classUser.role_id] === 'ADMIN' ? (
                  <li
                    key="editGroup"
                    className="p-2 hover:bg-gray-200"
                    onClick={() => {
                      setIsOpen(true);
                      setDropdownOpen(false);
                    }}
                  >
                    그룹 수정
                  </li>
                ) : null,
                <li
                  key="deleteOrLeaveGroup"
                  className="p-2 hover:bg-gray-200"
                  onClick={() => {
                    setIsOpen(true);
                    setDropdownOpen(false);
                  }}
                >
                  {ROLES[classUser.role_id] === 'ADMIN'
                    ? 'Delete group'
                    : 'Leave group'}
                </li>,
              ]
            : null}
          <li className="p-2 hover:bg-gray-200" onClick={handleClickLogout}>
            로그아웃
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
