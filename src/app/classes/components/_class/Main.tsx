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

export interface ClassItem {
  id: number;
  name: string;
  description: string;
  image: string;
  is_favorite: boolean;
  uid: number;
  role?: string;
}

const Main = () => {
  const user = useRecoilValue(userState) as User;
  const tabs = [
    '全体',
    '生成リスト',
    'ブックマーク',
    '招待リスト',
    '申込リスト',
  ];
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [createdClasses, setCreatedClasses] = useState<ClassItem[]>([]);
  const [inviteClasses, setInviteClasses] = useState<ClassItem[]>([]);
  const [favoriteClasses, setFavoriteClasses] = useState<ClassItem[]>([]);
  const [waitingClasses, setWaitingClasses] = useState<ClassItem[]>([]);
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [activeModalId, setActiveModalId] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getClassAfterCreate = async () => {
    const allRes = await classAPI.getClasses(user.id);
    setClasses(allRes.data);
  };

  const loadClasses = async () => {
    switch (activeTab) {
      case '生成リスト': {
        const createdRes = await classAPI.getClassesRole(user.id, 'ADMIN');
        setCreatedClasses(createdRes.data);
        break;
      }
      case '招待リスト': {
        const inviteRes = await classAPI.getClassesRole(user.id, 'INVITE');
        setInviteClasses(inviteRes.data);
        break;
      }
      case '申込リスト': {
        const waitingRes = await classAPI.getClassesRole(user.id, 'APPLICANT');
        setWaitingClasses(waitingRes.data);
        break;
      }
      case 'ブックマーク': {
        const favoriteRes = await classAPI.getFavoriteClasses(user.id);
        setFavoriteClasses(favoriteRes.data);
        break;
      }
      default: {
        const allRes = await classAPI.getClasses(user.id);
        const filteredClasses = allRes.data.filter(
          (classItem: ClassItem) =>
            classItem.role !== 'INVITE' && classItem.role !== 'APPLICANT'
        );
        setClasses(filteredClasses);
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
    全体: <CardList classes={classes} />,
    生成リスト: <CardList classes={createdClasses} />,
    ブックマーク: <CardList classes={favoriteClasses} />,
    招待リスト: (
      <Invite onInvitationClick={handleModalOpen} classes={inviteClasses} />
    ),
    申込リスト: <Waiting classes={waitingClasses} />,
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
        {activeModalId === 'クラス作成' && (
          <ClassCreate
            setActiveModalId={setActiveModalId}
            getClassAfterCreate={getClassAfterCreate}
            uid={user.id}
          />
        )}
        {activeModalId === 'クラス加入' && (
          <ClassJoin
            setActiveModalId={setActiveModalId}
            setIsModalOpen={setIsModalOpen}
            uid={user.id}
            name={user.name}
          />
        )}
        {isModalOpen && <ClassPassword onClose={handleModalClose} />}
      </div>
    </div>
  );
};

export default Main;
