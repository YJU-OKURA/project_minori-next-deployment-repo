'use client';
import {useState} from 'react';
import {Dashboard, TabsMapping} from '@/src/components/dashboard';
import PromptChat from './PromptChat';
import Storage from './Storage';
import '@/src/styles/variable.css';

const SubContainer = () => {
  const TABS = ['PromptChat', 'Storage'];
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const tabMapping = {
    PromptChat: <PromptChat />,
    Storage: <Storage />,
  };

  return (
    <div className="w-full h-full">
      <Dashboard
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabs={TABS}
      />
      <div className="subContainer">
        <TabsMapping activeTab={activeTab} tabMapping={tabMapping} />
      </div>
    </div>
  );
};

export default SubContainer;
