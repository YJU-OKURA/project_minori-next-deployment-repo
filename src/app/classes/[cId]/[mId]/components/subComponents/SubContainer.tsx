'use client';
import {useState} from 'react';
import {useRecoilValue} from 'recoil';
import {useParams} from 'next/navigation';
import {Dashboard, TabsMapping} from '@/src/components/dashboard';
import PromptChat from './PromptChat';
import Storage from './Storage';
import materialState from '@/src/recoil/atoms/materialState';
import '@/src/styles/variable.css';
import ShowMain from '../chatComponents/page';

const SubContainer: React.FC = () => {
  const TABS = ['プロンプト', 'セーブリスト'];
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const [showMain, setShowMain] = useState(false);
  const params = useParams<{cId: string}>();
  const material = useRecoilValue(materialState);

  const tabMapping = {
    プロンプト: (
      <PromptChat
        pId={material ? material.prompts[0]?.id : 0}
        cId={parseInt(params.cId)}
      />
    ),
    セーブリスト: (
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
      <button
        onClick={() => setShowMain(!showMain)}
        className="fixed top-1 right-4 z-50 bg-primary text-primary-foreground rounded-full p-3 shadow-lg hover:bg-primary/90"
      >
        {showMain ? '💬' : '💬'}
      </button>
      {showMain && (
        <div className="fixed top-0 right-0 w-96 h-full bg-white shadow-lg z-10">
          <ShowMain />
        </div>
      )}
    </div>
  );
};

export default SubContainer;
