import {Dispatch, SetStateAction} from 'react';

interface UserInfo {
  uid: number;
  image: string;
  nickname: string;
  role: string;
}

interface ClassShowProps {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  classId: number;
  userInfo: UserInfo;
}

export default ClassShowProps;
