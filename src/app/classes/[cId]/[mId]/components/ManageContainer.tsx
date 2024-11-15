'use client';
import {useState} from 'react';
import {Dashboard, TabsMapping} from '@/src/components/dashboard';
import ManageMaterialContainer from './ManageMaterialContainer';
import QuizContainer from './QuizContainer';
import FeedbackContainer from './FeedbackContainer';
import AttendanceContainer from './AttendanceContainer';
import '@/src/styles/variable.css';

const ManageContainer = (props: {cId: string}) => {
  const tabs = ['資料', 'クイズ', 'フィードバック', '出席'];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const tabMapping = {
    資料: <ManageMaterialContainer />,
    クイズ: <QuizContainer cId={parseInt(props.cId)} />,
    フィードバック: <FeedbackContainer cId={parseInt(props.cId)} />,
    出席: <AttendanceContainer cId={parseInt(props.cId)} />,
  };
  return (
    // 퀴즈
    <div className="w-full">
      <Dashboard
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabs={tabs}
      />
      <TabsMapping activeTab={activeTab} tabMapping={tabMapping} />
    </div>
  );
};

export default ManageContainer;
