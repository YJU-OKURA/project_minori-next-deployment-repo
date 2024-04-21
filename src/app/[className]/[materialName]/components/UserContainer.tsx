'use client';
import {useState} from 'react';
import {Dashboard, TabsMapping} from '@/src/components/dashboard';
import Material from './Material';
import Quiz from './Quiz';

const UserContainer = () => {
  const TABS = ['Material', 'Quiz'];
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const tabMapping = {
    Material: <Material />,
    Quiz: <Quiz />,
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
