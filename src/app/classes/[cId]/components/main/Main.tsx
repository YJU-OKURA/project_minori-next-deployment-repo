'use client';

import {useState} from 'react';
import Image from 'next/image';
import {Notice, Post, Schedule} from '.';
import {
  ClassCreatePost,
  ClassCreateSchedule,
} from '@/src/app/classes/[cId]/components/modal';
import {RoleProps} from '@/src/interfaces/_class';
import icons from '@/public/svgs/_class';

const Main = ({managerRole, classId}: RoleProps) => {
  const [showDropdown, setShowDropdown] = useState<Record<string, boolean>>({
    공지사항: false,
    일정: false,
    게시글: false,
  });
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);

  const handleDropdown = (sectionTitle: string) => {
    setShowDropdown(prevState => {
      const newState = Object.assign({}, prevState);
      newState[sectionTitle] = !prevState[sectionTitle];
      return newState;
    });
  };

  const handleOpenScheduleModal = () => {
    setShowDropdown(prevState => ({...prevState, 일정: true}));
    setShowScheduleModal(true);
  };

  const handleCloseScheduleModal = () => {
    setShowDropdown(prevState => ({...prevState, 일정: false}));
    setShowScheduleModal(false);
  };

  const handleOpenPostModal = () => {
    setShowDropdown(prevState => ({
      ...prevState,
      게시글: true,
      일정: !prevState['일정'],
    }));
    setShowPostModal(true);
  };

  const handleClosePostModal = () => {
    setShowDropdown(prevState => ({
      ...prevState,
      게시글: false,
      공지사항: !prevState['공지사항'],
    }));
    setShowPostModal(false);
  };

  const mainSections = [
    {
      title: '공지사항',
      component: (
        <Notice
          managerRole={managerRole}
          classId={classId}
          isOpen={showDropdown['공지사항']}
        />
      ),
    },
    {
      title: '일정',
      component: (
        <>
          <Schedule
            managerRole={managerRole}
            classId={classId}
            isOpen={showDropdown['일정']}
          />
          {showScheduleModal && (
            <ClassCreateSchedule
              setShowScheduleModal={handleCloseScheduleModal}
            />
          )}
        </>
      ),
      openModal: handleOpenScheduleModal,
    },
    {
      title: '게시글',
      component: (
        <>
          <Post
            managerRole={managerRole}
            classId={classId}
            isOpen={showDropdown['게시글']}
          />
          {showPostModal && (
            <ClassCreatePost setShowPostModal={handleClosePostModal} />
          )}
        </>
      ),
      openModal: handleOpenPostModal,
    },
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
                onClick={() => handleDropdown(section.title)}
              />
              <div className="flex w-full mb-3 justify-between items-center">
                <h3
                  className="text-xl font-bold hover:cursor-pointer"
                  onClick={() => handleDropdown(section.title)}
                >
                  {section.title}
                </h3>
                {managerRole &&
                  (section.title === '일정' || section.title === '게시글') && (
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
