'use client';

import {DashboardProps} from '@/src/interfaces/dashboard';

const Dashboard = ({tabs, activeTab, setActiveTab}: DashboardProps) => {
  const handleClick = (tab: React.SetStateAction<string>) => {
    setActiveTab(tab);
  };
  return (
    <nav className="mt-4 flex">
      {tabs.map(tab => (
        <div
          key={tab}
          className={`grid place-items-center min-w-14 max-w-40 h-10 border-r border-gray-400 px-4 hover:cursor-pointer ${
            activeTab === tab
              ? 'text-black bg-sky-50'
              : 'text-gray-400 hover:bg-slate-100 '
          }`}
          onClick={() => handleClick(tab)}
        >
          {tab}
        </div>
      ))}
    </nav>
  );
};

export default Dashboard;
