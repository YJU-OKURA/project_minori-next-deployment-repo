'use client';
import {ChangeEvent, useState} from 'react';
import {Dashboard, TabsMapping} from '@/src/components/dashboard';
import PromptChat from './PromptChat';
import Storage from './Storage';
import postPrompt from '@/src/api/prompts/postPrompt';
import '@/src/styles/variable.css';

const SubContainer = () => {
  const TABS = ['PromptChat', 'Storage'];
  const [inputMsg, setInputMsg] = useState<string>('');
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const tabMapping = {
    PromptChat: <PromptChat />,
    Storage: <Storage />,
  };

  const handleInputMsg = (e: ChangeEvent<HTMLInputElement>) => {
    setInputMsg(e.target.value);
  };

  const handleClickButton = () => {
    postPrompt(1, 1, inputMsg);
  };
  return (
    <div className="w-full h-full">
      <Dashboard
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabs={TABS}
      />
      <div className="subContainer overflow-scroll py-5">
        <TabsMapping activeTab={activeTab} tabMapping={tabMapping} />
      </div>
      <div className="h-20 flex items-center">
        <div className="w-full border-2 rounded-md flex justify-between items-center overflow-hidden">
          <input
            type="text"
            className="w-11/12 p-2 outline-none"
            placeholder="Please enter your question"
            onChange={handleInputMsg}
          />
          <div className="w-1/12 p-3 bg-gray-600" onClick={handleClickButton}>
            Enter
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubContainer;
