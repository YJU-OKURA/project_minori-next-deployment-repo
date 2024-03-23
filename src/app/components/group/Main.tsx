'use client';

import React, {useEffect, useState} from 'react';
import {Favorite, Created, Joined, Invite, Waiting, Header} from '.';
import {Dashboard, TabsMapping} from '@/src/components/dashboard';
import {ClassCreate, ClassJoin, ClassPassword} from './modal';
import User from '@/src/model/User';
import getClasses from '@/src/api/_class/getClasses';

const Main = () => {
  const [classes, setClasses] = useState([]);
  const tabs = ['Joined', 'Created', 'Favorite', 'Invite', 'Waiting'];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [activeModalId, setActiveModalId] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const loadClasses = async () => {
      const response = await getClasses(User.uid);
      setClasses(response.data);
    };

    loadClasses();
  }, []);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  const tabMapping = {
    Joined: <Joined classes={classes} />,
    // {/* バックエンドAPIの修正が終わったら、四つのComponentも追加します。 */}
    Created: <Created />,
    Favorite: <Favorite />,
    Invite: <Invite onInvitationClick={handleModalOpen} />,
    Waiting: <Waiting />,
  };

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
          <ClassJoin
            setActiveModalId={setActiveModalId}
            setIsModalOpen={setIsModalOpen}
          />
        )}
        {isModalOpen && <ClassPassword onClose={handleModalClose} />}
      </div>
    </div>
  );
};

export default Main;
