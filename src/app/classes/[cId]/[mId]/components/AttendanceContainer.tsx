import {ChangeEvent, useEffect, useMemo, useState} from 'react';
import Attendance from './Attendance';
import getClassScheduleList from '@/src/api/classSchedule/getClassScheduleList';
import {format, isBefore, startOfDay} from 'date-fns';
import {ScheduleData} from '@/src/interfaces/_class';
import {ClassDate} from '@/src/interfaces/attendance';

const DayComponent = ({
  day,
  month,
  year,
  index,
  openModal,
  specialDays,
}: {
  day: string;
  month: number;
  year: number;
  index: number;
  openModal: () => void;
  specialDays: ClassDate[];
}) => {
  const specialDay = specialDays.find(specialDay => {
    const date = new Date(specialDay.endDate);
    return (
      format(date, 'dd') === day &&
      date.getMonth() === month &&
      date.getFullYear() === year
    );
  });
  console.log(specialDay);
  const isSpecialDay = specialDays.some(specialDay => {
    const date = new Date(specialDay.endDate);
    return (
      format(date, 'dd') === day &&
      date.getMonth() === month &&
      date.getFullYear() === year
    );
  });
  const formattedDate = `${year}-${
    month + 1 < 10 ? '0' + (month + 1) : month + 1
  }-${day.length < 2 ? '0' + day : day}`;
  const today = format(startOfDay(new Date()), 'yyyy-MM-dd');

  return (
    <td onClick={() => console.log(day)} className="h-[100px] py-1">
      <div
        className={
          day === ''
            ? ''
            : 'h-full border-2 border-gray-300 rounded-lg m-1 px-2 py-1'
        }
        onClick={
          isSpecialDay && isBefore(formattedDate, today) ? openModal : () => {}
        }
      >
        <span className={index === 0 ? 'text-red-500' : ''}>{day}</span>
        {isSpecialDay ? (
          <div className="flex items-center bg-gray-200 rounded-lg px-2">
            <div
              className={
                isBefore(formattedDate, today)
                  ? 'w-[13px] h-[13px] rounded-full bg-green-400'
                  : 'w-[13px] h-[13px] rounded-full bg-red-400'
              }
            ></div>
            <span className="text-sm pl-1">{specialDay?.name}</span>
          </div>
        ) : null}
      </div>
    </td>
  );
};

const AttendanceContainer = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [specialDays, setSpecialDays] = useState<ClassDate[]>([]);
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear()
  );
  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date().getMonth() + 1
  );

  const checkLeapYear = (year: number) => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  };

  const getFirstDay = (year: number, month: number) => {
    const firstDay = new Date(year, month - 1, 1).getDay();
    return firstDay;
  };

  const changeYearMonth = (year: number, month: number) => {
    const monthDay = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (checkLeapYear(year)) {
      monthDay[1] = 29;
    }

    const firstDay = getFirstDay(year, month);
    const lastDay = monthDay[month - 1];

    const arrCalender = [];

    for (let i = 0; i < firstDay; i++) {
      arrCalender.push('');
    }

    for (let i = 1; i <= lastDay; i++) {
      arrCalender.push(String(i));
    }

    const remainDay = 7 - (arrCalender.length % 7);

    if (remainDay < 7) {
      for (let i = 0; i < remainDay; i++) {
        arrCalender.push('');
      }
    }

    return arrCalender;
  };

  const changeMonth = (month: number) => {
    setCurrentMonth(prev => prev + month);
  };

  const calendar = useMemo(() => {
    if (currentMonth < 1) {
      setCurrentYear(prev => prev - 1);
      setCurrentMonth(12);
    } else if (currentMonth > 12) {
      setCurrentYear(prev => prev + 1);
      setCurrentMonth(1);
    }
    const flatCalendar = changeYearMonth(currentYear, currentMonth);
    const weeks = [];
    while (flatCalendar.length) {
      weeks.push(flatCalendar.splice(0, 7));
    }
    return weeks;
  }, [currentYear, currentMonth]);

  useEffect(() => {
    getClassScheduleList(6).then(res => {
      const data: ScheduleData[] = res.data;
      console.log(data);
      const specialDays = data.map(e => {
        const end = new Date(e.EndedAt);
        return {
          endDate: end.toISOString(),
          name: e.Title,
        };
      });
      setSpecialDays(specialDays);
    });

    // 생성한 날짜를 상태에 저장합니다.
  }, []);

  const openModal = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    const modalContainer = document.getElementById('modal-container');
    if (modalContainer && !modalContainer.contains(event.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.addEventListener('mousedown', handleOutsideClick);

      return () => {
        document.removeEventListener('mousedown', handleOutsideClick);
      };
    }
  }, []);

  return (
    <div className="w-[700px] m-auto py-10">
      <div className="flex justify-center relative py-2">
        <input
          type="number"
          defaultValue={currentYear}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setCurrentYear(parseInt(e.target.value))
          }
          className="w-[80px] text-center text-2xl font-semibold"
        />
        <div className="absolute right-10">
          <button onClick={() => changeMonth(-1)} className="px-2">
            {'<'}
          </button>
          <select
            name=""
            id=""
            className="bg-gray-200 p-1"
            value={currentMonth}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setCurrentMonth(parseInt(e.target.value))
            }
          >
            <option value="1">1月</option>
            <option value="2">2月</option>
            <option value="3">3月</option>
            <option value="4">4月</option>
            <option value="5">5月</option>
            <option value="6">6月</option>
            <option value="7">7月</option>
            <option value="8">8月</option>
            <option value="9">9月</option>
            <option value="10">10月</option>
            <option value="11">11月</option>
            <option value="12">12月</option>
          </select>
          <button onClick={() => changeMonth(1)} className="px-2">
            {'>'}
          </button>
        </div>
      </div>
      <div>
        <table className="w-full h-[530px] table-fixed py-2">
          <thead className="text-center">
            <tr>
              <th>Sun</th>
              <th className="py-2">Mon</th>
              <th>Tue</th>
              <th>Wed</th>
              <th>Thu</th>
              <th>Fri</th>
              <th>Sat</th>
            </tr>
          </thead>
          <tbody>
            {calendar.map((week, index) => (
              <tr key={index}>
                {week.map((day, index) => (
                  <DayComponent
                    key={index}
                    day={day}
                    month={currentMonth - 1}
                    year={currentYear}
                    index={index}
                    openModal={openModal}
                    specialDays={specialDays}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {isOpen ? <Attendance /> : null}
      </div>
    </div>
  );
};

export default AttendanceContainer;
