'use client';

import {useState} from 'react';
import Image from 'next/image';
import {Notice, Post, Schedule} from '.';
import {
  ClassCreatePost,
  ClassCreateSchedule,
} from '@/src/app/classes/[cId]/components/modal';
import {MainSectionProps, RoleProps} from '@/src/interfaces/_class';
import icons from '@/public/svgs/_class';

const Main = ({managerRole, classId, userInfo}: RoleProps) => {
  const [showDropdown, setShowDropdown] = useState<Record<string, boolean>>({
    お知らせ: true,
    スケジュール: true,
    投稿: true,
  });
  const [modalState, setModalState] = useState({
    schedule: false,
    post: false,
  });

  const handleModal = (modalType: string, state: boolean) => {
    setModalState(prevState => ({...prevState, [modalType]: state}));
    setShowDropdown(prevState => ({...prevState, [modalType]: state}));
  };
  const createSection = (
    title: string,
    Component: React.ElementType,
    ModalComponent: React.ElementType,
    modalType: string
  ) => ({
    title,
    component: (
      <>
        <Component
          managerRole={managerRole}
          classId={classId}
          userInfo={userInfo}
          isOpen={showDropdown[title]}
        />
        {modalState[modalType as keyof typeof modalState] && (
          <ModalComponent
            setShowModal={(state: boolean) => handleModal(modalType, state)}
            classId={classId}
            userInfo={userInfo}
          />
        )}
      </>
    ),
    openModal: () => handleModal(modalType, true),
  });

  const mainSections: MainSectionProps[] = [
    {
      title: 'お知らせ',
      component: (
        <Notice
          managerRole={managerRole}
          classId={classId}
          userInfo={userInfo}
          isOpen={showDropdown['お知らせ']}
        />
      ),
    },
    createSection(
      'スケジュール',
      Schedule,
      ClassCreateSchedule,
      'スケジュール'
    ),
    createSection('投稿', Post, ClassCreatePost, '投稿'),
  ];

  return (
    <>
      <div className="mt-2 w-11/12">
        {mainSections.map((section, index) => (
          <div key={index}>
            <div className="flex">
              <Image
                src={icons.dropdownButton}
                alt={'dropdown'}
                width={0}
                height={0}
                className={`me-2 w-auto h-auto max-w-6 max-h-6 hover:cursor-pointer ${
                  showDropdown[section.title] ? '' : '-rotate-90'
                }`}
                onClick={() =>
                  handleModal(section.title, !showDropdown[section.title])
                }
              />
              <div className="flex w-full mb-3 justify-between items-center">
                <h3
                  className="text-xl font-bold hover:cursor-pointer"
                  onClick={() =>
                    handleModal(section.title, !showDropdown[section.title])
                  }
                >
                  {section.title}
                </h3>
                {managerRole &&
                  (section.title === 'スケジュール' ||
                    section.title === '投稿') && (
                    <div onClick={section.openModal}>
                      <Image
                        src={icons.addButton}
                        alt={'addButton'}
                        width={0}
                        height={0}
                        className="w-auto h-auto max-w-6 max-h-6"
                      />
                    </div>
                  )}
              </div>
            </div>
            <div className="mb-10">
              {showDropdown[section.title] && <div>{section.component}</div>}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Main;
