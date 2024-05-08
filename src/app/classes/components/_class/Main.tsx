'use client';

import React, {useEffect, useState} from 'react';
import {Invite, Waiting, Header} from '.';
import {ClassCreate, ClassJoin, ClassPassword} from './modal';
import {CardList} from '../card';
import {Dashboard, TabsMapping} from '@/src/components/dashboard';
import {useRecoilValue} from 'recoil';
import userState from '@/src/recoil/atoms/userState';
import {User} from '@/src/interfaces/user';
import classAPI from '@/src/api/_class';

const Main = () => {
  const user = useRecoilValue(userState) as User;
  const tabs = ['전체보기', '생성목록', '즐겨찾기', '초대목록', '신청목록'];
  const [classes, setClasses] = useState([]);
  const [createdClasses, setCreatedClasses] = useState([]);
  const [inviteClasses, setInviteClasses] = useState([]);
  const [favoriteClasses, setFavoriteClasses] = useState([]);
  const [waitingClasses, setWaitingClasses] = useState([]);
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [activeModalId, setActiveModalId] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getClassAfterCreate = async () => {
    const allRes = await classAPI.getClasses(user.id);
    setClasses(allRes.data);
  };

  const loadClasses = async () => {
    switch (activeTab) {
      case '생성목록': {
        const createdRes = await classAPI.getClassesRole(user.id, 'ADMIN');
        const adminClasses = createdRes.data.filter(
          (classItem: {role: string}) => classItem.role === 'ADMIN'
        );
        setCreatedClasses(adminClasses);
        break;
      }
      case '초대목록': {
        const inviteRes = await classAPI.getClassesRole(user.id, 'INVITE');
        const inviteClasses = inviteRes.data.filter(
          (classItem: {role: string}) => classItem.role === 'INVITE'
        );
        setInviteClasses(inviteClasses);
        break;
      }
      case '신청목록': {
        const waitingRes = await classAPI.getClassesRole(user.id, 'APPLICANT');
        const waitingClasses = waitingRes.data.filter(
          (classItem: {role: string}) => classItem.role === 'APPLICANT'
        );
        setWaitingClasses(waitingClasses);
        break;
      }
      case '즐겨찾기': {
        const favoriteRes = await classAPI.getFavoriteClasses(user.id);
        setFavoriteClasses(favoriteRes.data);
        break;
      }
      default: {
        const allRes = await classAPI.getClasses(user.id);
        setClasses(allRes.data);
        break;
      }
    }
  };

  useEffect(() => {
    loadClasses();
  }, [activeTab]);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const tabMapping = {
    전체보기: <CardList classes={classes} />,
    생성목록: <CardList classes={createdClasses} />,
    즐겨찾기: <CardList classes={favoriteClasses} />,
    초대목록: (
      <Invite onInvitationClick={handleModalOpen} classes={inviteClasses} />
    ),
    신청목록: <Waiting classes={waitingClasses} />,
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
            uid={user.id}
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
