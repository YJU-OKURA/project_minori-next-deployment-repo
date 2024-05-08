import ReactCalendar from 'react-calendar';
import {useParams} from 'next/navigation';
import {ClassScheduleProps} from '@/src/interfaces/_class/modal';
import 'react-calendar/dist/Calendar.css';
import '@/src/styles/calendar.css';
import Link from 'next/link';

const ClassSchedule = ({
  setScheduleModalOpen,
  selectedSchedule,
}: ClassScheduleProps) => {
  const handleClose = () => {
    setScheduleModalOpen(false);
  };
  const scheduleData = selectedSchedule;
  const {StartedAt, EndedAt} = scheduleData;
  const startedDate = new Date(StartedAt);
  const endedDate = new Date(EndedAt);
  const [startedYear, startedMonth, startedDay] = [
    startedDate.getFullYear(),
    startedDate.getMonth(),
    startedDate.getDate(),
  ];
  const [endedYear, endedMonth, endedDay] = [
    endedDate.getFullYear(),
    endedDate.getMonth(),
    endedDate.getDate(),
  ];
  const param = useParams();
  const getClassId = Number(param.cId);
  return (
    <div id="classSchedule" className="fixed z-10 inset-0 overflow-y-auto">
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
                <h3 className="text-3xl leading-6 font-bold text-gray-900">
                  {scheduleData.Title}
                </h3>
              </div>
              <div className="mt-4">
                <div className="flex justify-center">
                  <ReactCalendar
                    value={[
                      new Date(startedYear, startedMonth, startedDay),
                      new Date(endedYear, endedMonth, endedDay),
                    ]}
                    className={'mt-4'}
                  />
                </div>
                <p className="mt-4 text-center text-xl py-2">
                  {scheduleData.StartedAt} ~ {scheduleData.EndedAt}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <div className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
              <Link href={`/classes/${getClassId}/show?sid=${scheduleData.ID}`}>
                입장
              </Link>
            </div>
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
export default ClassSchedule;
