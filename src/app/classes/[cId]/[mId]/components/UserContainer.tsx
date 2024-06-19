'use client';
import {useState} from 'react';
import {Dashboard, TabsMapping} from '@/src/components/dashboard';
import Material from './Material';
import QuizSet from './QuizSet';
import {useRecoilValue} from 'recoil';
import materialState from '@/src/recoil/atoms/materialState';
import userState from '@/src/recoil/atoms/userState';
import LiveClassViewer from './subComponents/LiveClassViewer';

const UserContainer = ({cId}: {cId: string}) => {
  const material = useRecoilValue(materialState);
  const user = useRecoilValue(userState);
  const TABS = ['학습자료', '퀴즈', '온라인수업'];
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const tabMapping = {
    학습자료: <Material />,
    퀴즈: <QuizSet cId={parseInt(cId)} mId={parseInt(material?.id || '0')} />,
    온라인수업: <LiveClassViewer classId={parseInt(cId)} userId={user?.id} />,
  };

  return (
    <div className="w-full">
      <Dashboard
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabs={TABS}
      />
      <TabsMapping activeTab={activeTab} tabMapping={tabMapping} />
    </div>
  );
};

export default UserContainer;
