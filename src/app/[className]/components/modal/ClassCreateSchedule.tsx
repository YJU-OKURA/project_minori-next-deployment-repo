'use client';

import React, {useState} from 'react';
import ReactCalendar from 'react-calendar';
import {useSearchParams} from 'next/navigation';
import {TimePicker} from '@/src/app/[className]/components/schedule';
import PostCreateClassSchedule from '@/src/api/classSchedule/postCreateClassSchedule';
import {ClassScheduleShowProps} from '@/src/interfaces/_class/modal';
import User from '@/src/model/User';
import 'react-calendar/dist/Calendar.css';
import '@/src/styles/calendar.css';

const ClassCreateSchedule = ({
  setShowScheduleModal,
}: ClassScheduleShowProps) => {
  const [dates, setDates] = useState<[Date, Date]>([new Date(), new Date()]);
  const [times, setTimes] = useState(['00:00', '00:00']);
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [title, setTitle] = useState('');
  const searchParams = useSearchParams();
  const uid = User.uid;
  const cid = Number(searchParams.get('id'));

  const handleDateChange = (newDates: Date | Date[]) => {
    if (Array.isArray(newDates)) {
      setDates([newDates[0], newDates[1]]);
    } else {
      setDates([newDates, newDates]);
    }
  };

  const handleTimeChange = (index: number) => (newTime: string) => {
    const newTimes = [...times];
    newTimes[index] = newTime;
    setTimes(newTimes);
  };

  const resetDates = () => {
    setDates([new Date(), new Date()]);
    setTimes(['00:00', '00:00']);
    setCheckboxChecked(false);
  };

  const handleCheckboxChange = () => {
    setCheckboxChecked(!checkboxChecked);
  };

  const handleClose = () => {
    setShowScheduleModal(false);
  };

  const toKSDate = (date: Date, index: number) => {
    const kstOffset = 9 * 60;
    const kstDate = new Date(date.getTime() + kstOffset * 60000);
    const year = kstDate.getUTCFullYear();
    const month = String(kstDate.getUTCMonth() + 1).padStart(2, '0');
    const day = String(kstDate.getUTCDate()).padStart(2, '0');
    const time = String(times[index]);
    const seconds = '00';

    return `${year}-${month}-${day}T${time}:${seconds}+09:00`;
  };

  const handleCreate = async () => {
    const postData = {
      uid: uid,
      cid: cid,
      ended_at: toKSDate(new Date(dates[1]), 1),
      is_live: checkboxChecked,
      started_at: toKSDate(new Date(dates[0]), 0),
      title: title,
    };
    try {
      await PostCreateClassSchedule(postData);
      alert('Schedule created successfully');
      setShowScheduleModal(false);
    } catch (error) {
      alert('Failed to create schedule');
      console.error(error);
    }
  };

  return (
    <div id="scheduleCreate" className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75" />
        </div>
        <span
          className="hidden sm:inline-block align-middle h-screen"
          aria-hidden="true"
        />
        <div className="inline-block align-bottom bg-white text-left shadow-xl transform transition-all my-8 sm:align-middle w-2/5">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-center text-3xl leading-6 font-bold text-gray-900">
                  클래스 일정 생성
                </h3>
              </div>
              <div className="mt-6">
                <div className="flex justify-center">
                  <input
                    type="text"
                    className="border-b border-slate-400 text-center text-3xl py-2"
                    placeholder="제목"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="flex justify-center">
                  <ReactCalendar
                    selectRange
                    onChange={value =>
                      handleDateChange((value as Date[]) || [])
                    }
                    value={dates.length >= 2 ? [dates[0], dates[1]] : undefined}
                    minDate={new Date()}
                    className={'mt-4'}
                  />
                </div>
                <div className="mt-3 flex justify-center items-center">
                  <label className="mt-2 w-30">
                    <input
                      className="mx-2"
                      type="checkbox"
                      checked={checkboxChecked}
                      onChange={handleCheckboxChange}
                    />
                    실시간 수업 여부
                  </label>
                </div>
                <div className="flex justify-center">
                  <div className="w-2/3 flex justify-between mt-2">
                    <div className="">
                      <p className="text-center text-lg font-semibold">
                        시작 시간
                      </p>
                      <TimePicker
                        value={times[0]}
                        onChange={handleTimeChange(0)}
                      />
                    </div>
                    <div>
                      <p className="text-center text-lg font-semibold">
                        종료 시간
                      </p>
                      <TimePicker
                        value={times[1]}
                        onChange={handleTimeChange(1)}
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex justify-center items-center w-full">
                  <button
                    className="border w-32 h-10 rounded-lg bg-gray-300"
                    onClick={resetDates}
                  >
                    일정 초기화
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between bg-white px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={handleCreate}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              생성
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassCreateSchedule;
