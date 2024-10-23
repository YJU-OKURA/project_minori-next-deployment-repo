'use client';
import {useEffect, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {ManageContainer, UserContainer} from './components';
import {SubContainer} from './components/subComponents';
import userState from '@/src/recoil/atoms/userState';
import materialState from '@/src/recoil/atoms/materialState';

const Page = (props: {params: {cId: string; mId: string}}) => {
  const {params} = props;
  const user = useRecoilValue(userState);
  const [userRole, setUserRole] = useState<string>('');
  const material = useRecoilValue(materialState);
  const [materialName, setMaterialName] = useState<string>('');

  useEffect(() => {
    if (user.role_id) setUserRole(user.role_id);
    if (material) setMaterialName(material.name);
  }, []);

  return (
    <div className="w-full box-border ">
      {userRole === 'ADMIN' ? (
        <div className="p-4">
          <div className="text-5xl py-4 border-b-2">{materialName}</div>
          <ManageContainer cId={params.cId} />
        </div>
      ) : (
        <div className="flex w-full h-screen">
          <div className="w-2/3 p-3">
            <div className="text-5xl py-4 border-b-2">{materialName}</div>
            <UserContainer cId={params.cId} />
          </div>
          {/* 右側 */}
          <div className="">
            <div className="h-full w-0.5 bg-gray-200"></div>
          </div>
          <div className="w-1/3 p-4 bg-white">
            <SubContainer />
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
