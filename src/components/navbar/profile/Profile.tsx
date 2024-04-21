import {useState} from 'react';
import Image from 'next/image';
import {useSetRecoilState} from 'recoil';
import isLogInState from '@/src/recoil/atoms/isLoginState';
import EditName from './EditName';
import Warning from '../../warning/Warning';
import putUserName from '@/src/api/classUser/putUserName';
import {ParamsProps} from '@/src/interfaces/navbar';
import {User} from '@/src/interfaces/user';
import ClassUser from '@/src/model/User';
import icons from '@/public/svgs/navbar';

const Profile = ({user, params}: {user: User; params: ParamsProps}) => {
  const setIsLogin = useSetRecoilState(isLogInState);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
    console.log(params);
  };

  const handleEditName = (name: string) => {
    setDropdownOpen(false);
    putUserName(user.id, 4, name);
  };

  const handleClickDelete = () => {
    // 追加予定
    console.log('class削除処理api 未完成');
  };

  const handleClickLogout = () => {
    setIsLogin(false);
    localStorage.clear();
    console.log('logout');
  };

  return (
    <div className="relative w-full h-12 flex items-start justify-between box-content ">
      <div className="flex items-center">
        <Image
          src={user.image}
          width={10}
          height={10}
          alt="userImage"
          className="w-8 h-8 rounded-lg object-cover"
        />

        <div className="mx-2">{user.name}</div>
      </div>
      <button
        className="relative w-8 h-8 rounded-lg float-end"
        onClick={toggleDropdown}
      >
        <Image src={icons.moreVert} alt="icon" width={30} height={30}></Image>
      </button>
      {dropdownOpen && (
        <ul className="absolute top-[32px] right-0 bg-white rounded-lg overflow-hidden drop-shadow-lg">
          <li
            className="p-2 hover:bg-gray-200"
            onClick={() => {
              setIsEditOpen(true);
              setDropdownOpen(false);
            }}
          >
            Edit Name
          </li>
          {ClassUser.managerRoll === 'manager' ? (
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
            {ClassUser.managerRoll === 'manager'
              ? 'Delete group'
              : 'Leave group'}
          </li>
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
        <EditName
          purpose="delete"
          setIsOpen={setIsEditOpen}
          func={handleEditName}
        />
      ) : null}
    </div>
  );
};

export default Profile;
