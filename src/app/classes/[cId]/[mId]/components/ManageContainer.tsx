'use client';
import {useState} from 'react';
import {Dashboard, TabsMapping} from '@/src/components/dashboard';
import ManageMaterialContainer from './ManageMaterialContainer';
import QuizContainer from './QuizContainer';
import FeedbackContainer from './FeedbackContainer';
// import AttendanceContainer from './AttendanceContainer';
import '@/src/styles/variable.css';

const ManageContainer = (props: {cId: string}) => {
  const tabs = ['자료', '퀴즈', '피드백', '출석'];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const tabMapping = {
    자료: <ManageMaterialContainer />,
    퀴즈: <QuizContainer cId={parseInt(props.cId)} />,
    피드백: <FeedbackContainer cId={parseInt(props.cId)} />,
    // Attendance: <AttendanceContainer />,
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
