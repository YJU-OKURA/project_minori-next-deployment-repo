'use client';

import {useState, useEffect} from 'react';
import {ScheduleCard} from '../card';
import getClassScheduleList from '@/src/api/classSchedule/getClassScheduleList';
import getClassSchedule from '@/src/api/classSchedule/getClassSchedule';
import DeleteClassSchedule from '@/src/api/classSchedule/deleteClassSchedule';
import {ClassSchedule} from '@/src/app/[className]/components/modal';
import {RoleProps} from '@/src/interfaces/_class';
import User from '@/src/model/User';

const Schedule = ({
  managerRole,
  classId,
  isOpen,
}: RoleProps & {isOpen: boolean}) => {
  const deleteSchedule = async (scheduleId: number) => {
    if (classId !== undefined) {
      try {
        if (confirm('Are you sure you want to delete this schedule?')) {
          await DeleteClassSchedule(scheduleId, classId, User.uid);
          alert('Schedule deleted successfully!');
          const schedules = await getClassScheduleList(classId);
          if (Array.isArray(schedules.data)) {
            setClassSchedules(schedules.data);
          } else {
            console.error('getClassSchedules did not return an array');
          }
        }
      } catch (error) {
        console.error(error);
        alert('Failed to delete schedule');
      }
    } else {
      alert('Failed to delete schedule');
    }
  };
  const toKST = (date: string) => {
    const utcDate = new Date(date);
    const kstDate = new Date(utcDate.getTime() + 9 * 60 * 60);
    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(kstDate);
  };
  const [classSchedules, setClassSchedules] = useState<
    {
      ID: number;
      Title: string;
      StartedAt: string;
      EndedAt: string;
      IsLive: boolean;
    }[]
  >([]);
  const [selectedSchedule, setSelectedSchedule] = useState<{
    ID: number;
    Title: string;
    StartedAt: string;
    EndedAt: string;
    IsLive: boolean;
  }>({ID: 0, Title: '', StartedAt: '', EndedAt: '', IsLive: false});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (classId !== undefined && isOpen) {
      getClassScheduleList(classId).then(schedules => {
        if (Array.isArray(schedules.data)) {
          console.log(schedules.data);
          setClassSchedules(schedules.data);
        } else {
          console.error('getClassSchedules did not return an array');
        }
      });
    }
  }, [classId, isOpen]);

  return (
    <div className="ms-2 h-40 flex overflow-x-auto scrollbar-visible">
      {classSchedules.length === 0 && (
        <div className="flex justify-center mt-2 w-full">
          <div className="flex w-1/2 border-4 justify-center items-center h-20">
            <h1 className="text-3xl font-semibold">No Schedule in class</h1>
          </div>
        </div>
      )}
      {classSchedules.map((schedule, index) => (
        <div
          key={index}
          onClick={async (event: React.MouseEvent) => {
            event.stopPropagation;
            setSelectedSchedule(await getClassSchedule(schedule.ID));
            setIsModalOpen(true);
          }}
        >
          <ScheduleCard
            scheduleName={schedule.Title}
            startTime={toKST(schedule.StartedAt)}
            endTime={toKST(schedule.EndedAt)}
            managerRole={managerRole}
            isLive={schedule.IsLive}
            zIndex={classSchedules.length - index}
            scheduleId={schedule.ID}
            deleteSchedule={deleteSchedule}
          />
        </div>
      ))}
      {isModalOpen && (
        <ClassSchedule
          setScheduleModalOpen={setIsModalOpen}
          selectedSchedule={selectedSchedule}
        />
      )}
    </div>
  );
};

export default Schedule;
