'use client';

import React, {useState} from 'react';
import {ClassEditSchedule} from '../modal';
import {Dropdown} from '@/src/app/classes/components/_class/dropdown';
import {ScheduleCardProps} from '@/src/interfaces/_class';
import icons from '@/public/svgs/_class';

const ScheduleCard = ({
  scheduleName,
  startTime,
  endTime,
  managerRole,
  isLive,
  zIndex,
  scheduleId,
  deleteSchedule,
}: ScheduleCardProps & {zIndex: number} & {
  deleteSchedule: (scheduleId: number) => void;
}) => {
  const dropdownItems = [
    {
      modalId: 'スケジュール修正',
      icon: icons.edit,
      alt: 'Edit Icon',
      text: '修正',
    },
    {
      modalId: 'スケジュール削除',
      icon: icons.delete,
      alt: 'Delete Icon',
      text: '削除',
    },
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedModalId, setSelectedModalId] = useState<string | null>(null);

  const setActiveModalId = (modalId: string) => {
    setSelectedModalId(modalId);
    setIsModalOpen(true);
    if (modalId === 'スケジュール削除') {
      deleteSchedule(scheduleId);
    }
  };

  return (
    <>
      <div className="my-2 me-6">
        <div
          className={`min-w-64 h-10 border-b-4 ${
            isLive ? 'border-b-red-400' : 'border-b-blue-400'
          }`}
        >
          <div className="flex justify-between items-center">
            <p className="font-semibold text-lg">
              {isLive ? `[Live] ${scheduleName}` : `${scheduleName}`}
            </p>
            {managerRole && (
              <>
                <div style={{width: 30, height: 30}}>
                  <Dropdown
                    dropdownImageSrc={icons.moreVert}
                    items={dropdownItems}
                    setActiveModalId={setActiveModalId}
                    zIndex={zIndex}
                  />
                </div>
              </>
            )}
          </div>
        </div>
        <div className="my-2">
          <p className="font-bold text-lg mb-2">日付</p>
          <p className="ms-2 text-md mb-1">{startTime}</p>
          <p className="ms-2 text-md">{endTime}</p>
        </div>
        {isModalOpen && selectedModalId === 'scheduleEdit' && (
          <ClassEditSchedule setShowScheduleModal={setIsModalOpen} />
        )}
      </div>
    </>
  );
};

export default ScheduleCard;
