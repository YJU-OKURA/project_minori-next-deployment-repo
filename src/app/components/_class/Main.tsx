'use client';

import React, {useEffect, useState} from 'react';
import {Invite, Waiting, Header} from '.';
import {ClassCreate, ClassJoin, ClassPassword} from './modal';
import {CardList} from '../card';
import {Dashboard, TabsMapping} from '@/src/components/dashboard';
import User from '@/src/model/User';
import classAPI from '@/src/api/_class';

const Main = () => {
  const tabs = ['Joined', 'Created', 'Favorite', 'Invite', 'Waiting'];
  const [classes, setClasses] = useState([]);
  const [createdClasses, setCreatedClasses] = useState([]);
  const [inviteClasses, setInviteClasses] = useState([]);
  const [favoriteClasses, setFavoriteClasses] = useState([]);
  const [waitingClasses, setWaitingClasses] = useState([]);
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [activeModalId, setActiveModalId] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getClassAfterCreate = async () => {
    const allRes = await classAPI.getClasses(User.uid);
    setClasses(allRes.data);
  };

  useEffect(() => {
    const loadClasses = async () => {
      switch (activeTab) {
        case 'Created': {
          const createdRes = await classAPI.getClassesRole(User.uid, 2);
          setCreatedClasses(createdRes.data);
          break;
        }
        case 'Invite': {
          const inviteRes = await classAPI.getClassesRole(User.uid, 6);
          setInviteClasses(inviteRes.data);
          break;
        }
        case 'Waiting': {
          const waitingRes = await classAPI.getClassesRole(User.uid, 4);
          setWaitingClasses(waitingRes.data);
          break;
        }
        case 'Favorite': {
          const favoriteRes = await classAPI.getFavoriteClasses(User.uid);
          setFavoriteClasses(favoriteRes.data);
          break;
        }
        default: {
          const allRes = await classAPI.getClasses(User.uid);
          setClasses(allRes.data);
          break;
        }
      }
    };
    loadClasses();
  }, [activeTab]);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const tabMapping = {
    Joined: <CardList classes={classes} />,
    Created: <CardList classes={createdClasses} />,
    Favorite: <CardList classes={favoriteClasses} />,
    Invite: (
      <Invite onInvitationClick={handleModalOpen} classes={inviteClasses} />
    ),
    Waiting: <Waiting classes={waitingClasses} />,
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
          <ClassCreate
            setActiveModalId={setActiveModalId}
            getClassAfterCreate={getClassAfterCreate}
          />
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
