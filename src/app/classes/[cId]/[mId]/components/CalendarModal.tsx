import {useState} from 'react';
import Calendar from 'react-calendar';
import TimePicker from 'react-time-picker';
import moment from 'moment';
import 'react-calendar/dist/Calendar.css';
import './CalendarModalCss.css';

const CalendarModal = ({
  setDeadLine,
  setIsOpen,
}: {
  setDeadLine: React.Dispatch<React.SetStateAction<string>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [value, onChange] = useState<Date | null | [Date | null, Date | null]>(
    new Date()
  );
  const [time, setTime] = useState<string>('00:00');

  const dateTime =
    value instanceof Date
      ? moment(`${moment(value).format('YYYY-MM-DD')} ${time}`).toDate()
      : null;

  const handleTimeSet = (time: string | null) => {
    if (time) {
      setTime(time);
    }
  };

  const handleClickSave = () => {
    if (dateTime) {
      setDeadLine(moment(dateTime).format('YYYY-MM-DD HH:mm'));
      setIsOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className=" bg-white rounded-lg w-[450px] h-[400px] p-5 box-border"
        id="modal-container"
      >
        <Calendar onChange={onChange} value={value} />
        <div className="flex justify-center items-center py-2">
          <span className="font-semibold">締切日時 :</span>
          <TimePicker onChange={handleTimeSet} value={time} />
        </div>
        <div className="flex justify-center py-1">
          <button
            className="bg-blue-500 text-white px-3 py-1 rounded-lg"
            onClick={handleClickSave}
          >
            確認
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalendarModal;
