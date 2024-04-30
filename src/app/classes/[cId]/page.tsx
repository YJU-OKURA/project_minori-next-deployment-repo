'use client';

import {useState} from 'react';
import {usePathname, useSearchParams} from 'next/navigation';
import {Dashboard, TabsMapping} from '@/src/components/dashboard';
import {Main} from './components/main';
import {Member} from './components/member';
import {Alarm} from './components/alarm';

const ClassMain = () => {
  const managerRole = true;
  const classTab = managerRole ? '맴버목록' : '알람';
  const tabs = ['메인', classTab];

  const searchParams = useSearchParams();
  const classId = Number(searchParams.get('id'));
  const pathname = usePathname().substring(1);
  const decodedPathname = decodeURIComponent(pathname);
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const tabMapping = {
    메인: <Main managerRole={managerRole} classId={classId} />,
    맴버목록: <Member />,
    알람: <Alarm />,
  };
  return (
    <>
      <div className="ms-10">
        <div className="mt-9">
          <div className="flex items-center justify-between me-10">
            <h1 className="text-black text-5xl font-medium">
              {decodedPathname}
            </h1>
          </div>
          {managerRole ? (
            <p className="mt-4 text-gray-400">교수자로 접속했습니다</p>
          ) : (
            <p className="mt-4 text-black">학생으로 접속했습니다</p>
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
