import React from 'react';
import LiveClass from './LiveClass';
import {useParams} from 'next/navigation';
import {useRecoilValue} from 'recoil';
import {User} from '@/src/interfaces/user';
import userState from '@/src/recoil/atoms/userState';

const ManageSubContainer: React.FC = () => {
  const {cId} = useParams<{cId: string}>();
  const classId = parseInt(cId, 10);
  const user = useRecoilValue(userState) as User;

  if (isNaN(classId) || user.id === 0) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <LiveClass classId={classId} userId={user.id} />
    </div>
  );
};

export default ManageSubContainer;
