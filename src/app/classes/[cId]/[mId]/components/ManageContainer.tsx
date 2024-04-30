'use client';
import {useState} from 'react';
import {Dashboard, TabsMapping} from '@/src/components/dashboard';
import ManageMaterialContainer from './ManageMaterialContainer';
// import QuizContainer from './QuizContainer';
import FeedbackContainer from './FeedbackContainer';
// import AttendanceContainer from './AttendanceContainer';
import '@/src/styles/variable.css';

const ManageContainer = () => {
  const tabs = ['자료', '퀴즈', '피드백', '출석'];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const tabMapping = {
    자료: <ManageMaterialContainer />,
    // Quiz: <QuizContainer />,
    피드백: <FeedbackContainer />,
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
