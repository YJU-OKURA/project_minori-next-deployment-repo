'use client';

import React, {useState} from 'react';
import {Favorite, Created, Joined, Invite, Waiting, Header} from '.';
import {Dashboard, TabsMapping} from '@/src/components/dashboard';

const Main = () => {
  const tabs = ['Joined', 'Created', 'Favorite', 'Invite', 'Waiting'];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const tabMapping = {
    Joined: <Joined />,
    Created: <Created />,
    Favorite: <Favorite />,
    Invite: <Invite />,
    Waiting: <Waiting />,
  };

  return (
    <div className="flex h-full ms-10 bg-gray-200">
      <div className="flex-grow bg-white">
        <Header />
        <Dashboard
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tabs={tabs}
        />
        <div className="flex flex-wrap ms-2 mt-12 ">
          <TabsMapping activeTab={activeTab} tabMapping={tabMapping} />
        </div>
      </div>
    </div>
  );
};

export default Main;
