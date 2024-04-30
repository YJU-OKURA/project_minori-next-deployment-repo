'use client';
import {useState} from 'react';
import {Dashboard, TabsMapping} from '@/src/components/dashboard';
import Material from './Material';
import Quiz from './Quiz';

const UserContainer = () => {
  const TABS = ['학습자료', '퀴즈'];
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const tabMapping = {
    학습자료: <Material />,
    퀴즈: <Quiz />,
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
