'use client';
import {useState} from 'react';
import {Dashboard, TabsMapping} from '@/src/components/dashboard';
import ManageMaterialContainer from './ManageMaterialContainer';
// import QuizContainer from './QuizContainer';
import FeedbackContainer from './FeedbackContainer';
// import AttendanceContainer from './AttendanceContainer';
import '@/src/styles/variable.css';

const ManageContainer = () => {
  const tabs = ['Material', 'Quiz', 'Feedback', 'Attendance'];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const tabMapping = {
    Material: <ManageMaterialContainer />,
    // Quiz: <QuizContainer />,
    Feedback: <FeedbackContainer />,
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
