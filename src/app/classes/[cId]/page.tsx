'use client';

import {useState, useEffect} from 'react';
import {useParams} from 'next/navigation';
import {useRecoilValue} from 'recoil';
import userState from '@/src/recoil/atoms/userState';
import {Dashboard, TabsMapping} from '@/src/components/dashboard';
import {Main} from './components/main';
import {Member} from './components/member';
import {Alarm} from './components/alarm';
import classAPI from '@/src/api/_class';
import getUserInfo from '@/src/api/classUser/getUserInfo';
import {User} from '@/src/interfaces/user';

const ClassMain = () => {
  const user = useRecoilValue(userState) as User;
  const [className, setClassName] = useState('');
  const [classDescription, setClassDescription] = useState('');
  const [userInfo, setUserInfo] = useState({
    id: 0,
    name: '',
    image: '',
    nickname: '',
  });
  const [managerRole, setManagerRole] = useState('');
  const classTab = managerRole ? '맴버목록' : '알람';
  const tabs = ['메인', classTab];
  const searchParams = useParams();
  const classId = Number(searchParams.cId);
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const tabMapping = {
    메인: (
      <Main managerRole={managerRole} classId={classId} userInfo={userInfo} />
    ),
    맴버목록: <Member />,
    알람: <Alarm />,
  };
  const fetchData = async () => {
    if (classId !== undefined) {
      const classData = await classAPI.getClassInfo(classId);
      const userData = await getUserInfo(user.id, classId);
      setClassName(classData.data.class.Name);
      setUserInfo(userData);
      setClassDescription(classData.data.class.Description);
      setManagerRole(userData.role);
    }
  };

  useEffect(() => {
    fetchData();
  }, [classId]);
  return (
    <>
      <div className="ms-10">
        <div className="mt-9">
          <div className="flex items-center justify-between me-10">
            <h1 className="text-black text-5xl font-medium">{className}</h1>
          </div>
          {managerRole === 'ADMIN' || managerRole === 'ASSISTANT' ? (
            <p className="mt-4 text-gray-400">{classDescription}</p>
          ) : (
            <p className="mt-4 text-black">{classDescription}</p>
          )}
          <div className="border border-gray-200 w-11/12 mt-4 "></div>
        </div>
        <div>
          <Dashboard
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            tabs={tabs}
          />
          <div className="flex flex-wrap ms-2 mt-6 ">
            <TabsMapping activeTab={activeTab} tabMapping={tabMapping} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ClassMain;
