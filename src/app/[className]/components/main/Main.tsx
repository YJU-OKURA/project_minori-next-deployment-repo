'use client';

import {useState} from 'react';
import Image from 'next/image';
import {Notice, Post, Schedule} from '.';
import {
  ClassCreatePost,
  ClassCreateSchedule,
} from '@/src/app/[className]/components/modal';
import {RoleProps} from '@/src/interfaces/_class';
import icons from '@/public/svgs/_class';

const Main = ({managerRole, classId}: RoleProps) => {
  const [showDropdown, setShowDropdown] = useState<Record<string, boolean>>({
    Notice: false,
    Schedule: false,
    Posts: false,
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
    setShowDropdown(prevState => ({...prevState, Schedule: true}));
    setShowScheduleModal(true);
  };

  const handleCloseScheduleModal = () => {
    setShowDropdown(prevState => ({...prevState, Schedule: false}));
    setShowScheduleModal(false);
  };

  const handleOpenPostModal = () => {
    setShowDropdown(prevState => ({
      ...prevState,
      Posts: true,
      Notice: !prevState['Notice'],
    }));
    setShowPostModal(true);
  };

  const handleClosePostModal = () => {
    setShowDropdown(prevState => ({
      ...prevState,
      Posts: false,
      Notice: !prevState['Notice'],
    }));
    setShowPostModal(false);
  };

  const mainSections = [
    {
      title: 'Notice',
      component: (
        <Notice
          managerRole={managerRole}
          classId={classId}
          isOpen={showDropdown['Notice']}
        />
      ),
    },
    {
      title: 'Schedule',
      component: (
        <>
          <Schedule
            managerRole={managerRole}
            classId={classId}
            isOpen={showDropdown['Schedule']}
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
      title: 'Posts',
      component: (
        <>
          <Post
            managerRole={managerRole}
            classId={classId}
            isOpen={showDropdown['Posts']}
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
                  (section.title === 'Schedule' ||
                    section.title === 'Posts') && (
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
