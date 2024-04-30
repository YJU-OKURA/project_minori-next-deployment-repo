'use client';
import {useRecoilValue} from 'recoil';
import {ManageContainer, UserContainer} from './components';
import {SubContainer} from './components/subComponents';
import classUserState from '@/src/recoil/atoms/classUserState';
import ROLES from '@/src/constants/roles';
import materialState from '@/src/recoil/atoms/materialState';
import {Suspense} from 'react';

const Page = () => {
  const classUser = useRecoilValue(classUserState);
  const material = useRecoilValue(materialState);

  return (
    <div className="w-full box-border ">
      <Suspense fallback={<div>로딩중...</div>}>
        {classUser && ROLES[classUser?.role_id] === 'ADMIN' ? (
          <div className="p-4">
            <div className="text-5xl py-4 border-b-2">{material?.name}</div>
            <ManageContainer />
          </div>
        ) : (
          <div className="flex w-full h-screen p-3">
            <div className="w-2/3">
              <div className="text-5xl py-4 border-b-2">{material?.name}</div>
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
      </Suspense>
    </div>
  );
};

export default Page;
