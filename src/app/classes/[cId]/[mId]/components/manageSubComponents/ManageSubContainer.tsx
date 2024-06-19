import React, {useState} from 'react';
import LiveClass from './LiveClass';
import {useParams} from 'next/navigation';
import {useRecoilValue} from 'recoil';
import {User} from '@/src/interfaces/user';
import userState from '@/src/recoil/atoms/userState';
import ShowMain from '../chatComponents/page';

const ManageSubContainer: React.FC = () => {
  const [showMain, setShowMain] = useState(false);
  const {cId} = useParams<{cId: string}>();
  const classId = parseInt(cId, 10);
  const user = useRecoilValue(userState) as User;

  if (isNaN(classId) || user.id === 0) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <LiveClass classId={classId} userId={user.id} />
      <button
        onClick={() => setShowMain(!showMain)}
        className="fixed top-1 right-4 z-50 bg-primary text-primary-foreground rounded-full p-3 shadow-lg hover:bg-primary/90"
      >
        {showMain ? '💬' : '💬'}
      </button>
      {showMain && (
        <div className="fixed top-0 right-0 w-96 h-full bg-white shadow-lg z-10">
          <ShowMain />
        </div>
      )}
    </div>
  );
};

export default ManageSubContainer;
