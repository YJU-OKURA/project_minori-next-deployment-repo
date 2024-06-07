'use client';
import {useState} from 'react';
import {useRecoilValue} from 'recoil';
import {Dashboard, TabsMapping} from '@/src/components/dashboard';
import PromptChat from './PromptChat';
import Storage from './Storage';
import materialState from '@/src/recoil/atoms/materialState';
import '@/src/styles/variable.css';
import {useParams} from 'next/navigation';

const SubContainer = () => {
  const TABS = ['프롬프트창', '저장목록'];
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const params = useParams<{cId: string}>();
  const material = useRecoilValue(materialState);
  const tabMapping = {
    프롬프트창: (
      <PromptChat
        pId={material ? material.prompts[0]?.id : 0}
        cId={parseInt(params.cId)}
      />
    ),
    저장목록: (
      <Storage
        pId={material ? material.prompts[0]?.id : 0}
        cId={parseInt(params.cId)}
      />
    ),
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
