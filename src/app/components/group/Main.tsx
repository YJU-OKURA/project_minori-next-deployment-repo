'use client';

import React, {useState} from 'react';
import {Favorite, Created, Joined, Invite, Waiting, Header} from '.';
import {Dashboard, TabsMapping} from '@/src/components/dashboard';
import {ClassCreate, ClassJoin} from './modal';

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
  const [activeModalId, setActiveModalId] = useState('');

  return (
    <div className="flex min-h-72 ms-10 bg-gray-200">
      <div className="flex-grow bg-white">
        <Header setActiveModalId={setActiveModalId} />
        <Dashboard
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tabs={tabs}
        />
        <div className="flex flex-wrap ms-2 mt-12 ">
          <TabsMapping activeTab={activeTab} tabMapping={tabMapping} />
        </div>
        {activeModalId === 'classCreate' && (
          <ClassCreate setActiveModalId={setActiveModalId} />
        )}
        {activeModalId === 'classJoin' && (
          <ClassJoin setActiveModalId={setActiveModalId} />
        )}
      </div>
    </div>
  );
};

export default Main;
