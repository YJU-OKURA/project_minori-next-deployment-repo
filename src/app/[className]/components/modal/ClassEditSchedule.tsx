import {SetStateAction, Dispatch, useState} from 'react';
import {TimePicker} from '../schedule';
import PutClassSchedule from '@/src/api/classSchedule/putClassSchedule';

const ClassEditSchedule = ({
  setShowScheduleModal,
}: {
  setShowScheduleModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const [times, setTimes] = useState(['00:00', '00:00']);
  const [checkboxChecked, setCheckboxChecked] = useState(false);

  const handleTimeChange = (index: number) => (newTime: string) => {
    const newTimes = [...times];
    newTimes[index] = newTime;
    setTimes(newTimes);
  };

  const handleCheckboxChange = () => {
    setCheckboxChecked(!checkboxChecked);
  };

  const handleClose = () => {
    setShowScheduleModal(false);
  };

  const handleEdit = async () => {
    const test = {
      sid: 2,
      uid: 14,
      cid: 3,
      startTime: '2024-04-08T09:00:00+09:00',
      isLive: false,
      endTime: '2024-04-08T05:00:00+09:00',
      title: 'PutTest',
    };
    try {
      await PutClassSchedule({
        sid: test.sid,
        uid: test.uid,
        cid: test.cid,
        started_at: test.startTime,
        is_live: test.isLive,
        ended_at: test.endTime,
        title: test.title,
      });
      alert('Schedule created successfully');
      setShowScheduleModal(false);
    } catch (error) {
      alert('Failed to create schedule');
      console.error(error);
    }
  };

  const handleEditPageClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <div
      id="scheduleEdit"
      className="fixed z-10 inset-0 overflow-y-auto"
      onClick={handleEditPageClick}
    >
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
                  Edit Class Schedule
                </h3>
              </div>
              <div className="mt-6">
                <div className="mt-3 flex justify-center items-center">
                  <label className="mt-2 w-30">
                    <input
                      className="mx-2"
                      type="checkbox"
                      checked={checkboxChecked}
                      onChange={handleCheckboxChange}
                    />
                    Live Stream Schedule
                  </label>
                </div>
                <div className="flex justify-center">
                  <div className="w-2/3 flex justify-between mt-2">
                    <div className="">
                      <p className="text-center text-lg font-semibold">
                        start time
                      </p>
                      <TimePicker
                        value={times[0]}
                        onChange={handleTimeChange(0)}
                      />
                    </div>
                    <div>
                      <p className="text-center text-lg font-semibold">
                        end time
                      </p>
                      <TimePicker
                        value={times[1]}
                        onChange={handleTimeChange(1)}
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex justify-center items-center w-full">
                  <button className="border w-32 h-10 rounded-lg bg-gray-300">
                    Reset Dates
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between bg-white px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={handleEdit}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassEditSchedule;
