'use client';
import {useRecoilValue} from 'recoil';
import {ManageContainer, UserContainer} from './components';
import {SubContainer} from './components/subComponents';
import classUserState from '@/src/recoil/atoms/classUserState';
import ROLES from '@/src/constants/roles';

const Page = () => {
  const classUser = useRecoilValue(classUserState);
  return (
    <div className="w-full box-border ">
      {classUser && ROLES[classUser?.role_id] === 'ADMIN' ? (
        <div className="p-4">
          <div className="text-5xl py-4 border-b-2">SubjectName</div>
          <ManageContainer />
        </div>
      ) : (
        <div className="flex w-full h-screen p-3">
          <div className="w-2/3">
            <div className="text-5xl py-4 border-b-2">SubjectName</div>
            <UserContainer />
          </div>
          {/* 右側 */}
          <div className="px-3">
            <div className="h-full w-0.5 bg-gray-200"></div>
          </div>
          <div className="w-1/3">
            <SubContainer />
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
