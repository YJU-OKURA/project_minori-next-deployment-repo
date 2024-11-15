import getAttendance from '@/src/api/attendance/getAttendance';
import getAttendances from '@/src/api/attendance/getAttendances';
// import postAttendance from '@/src/api/attendance/postAttendance';
import type {Attendance, AttendanceUser} from '@/src/interfaces/attendance';
import AttendanceProps from '@/src/interfaces/attendance/AttendanceProps';
import Image from 'next/image';
import {useEffect, useState} from 'react';

const Attendance = ({cId}: {cId: number}) => {
  const [attendances, setAttendances] = useState<AttendanceProps>();
  const [AttendanceUsers, setAttendanceUsers] = useState<AttendanceUser[]>([]);
  const [isModify, setIsModify] = useState<boolean[]>([]);
  // const [selectedOption, setSelectedOption] = useState('');
  // const [isReload, setIsReload] = useState<boolean>(false);
  console.log(isModify);

  useEffect(() => {
    getAttendances(8).then(res => {
      console.log(res);
    });
    getAttendance(cId).then(res => {
      console.log(res);
      setAttendanceUsers(res.attendances);
      setAttendances({
        ATTENDANCE: res.statistics.ATTENDANCE || 0,
        TARDY: res.statistics.TARDY || 0,
        ABSENCE: res.statistics.ABSENCE || 0,
      });
      // setSelectedOption(res.attendances[0].IsAttendance);
      setIsModify(new Array(res.attendances.length).fill(false));
    });
  }, []);

  // const handleClickModify = (
  //   uid: number,
  //   cid: number,
  //   csid: number,
  //   status: string
  // ) => {
  //   console.log(uid, cid, csid, status);
  //   const user: Attendance[] = [
  //     {
  //       uid: uid,
  //       cid: cid,
  //       csid: csid,
  //       status: status,
  //     },
  //   ];

  //   if (user)
  //     postAttendance(user).then(res => {
  //       setIsReload(!isReload);
  //       console.log(res);
  //     });
  // };

  // const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   setSelectedOption(event.target.value);
  // };

  // const isModifyOpen = (index: number) => {
  //   console.log(index);
  //   setIsModify(prev => prev.map((open, i) => (i === index ? !open : open))); // クリックしたコメントの開閉状態を反転
  // };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        className=" bg-white rounded-lg w-[800px] h-[600px] py-[30px] box-border flex items-center"
        id="modal-container"
      >
        <div className="w-full h-[500px]">
          <div className="text-xl font-semibold text-center">Attendance</div>
          <div className="text-lg font-semibold text-green-400 text-center">
            出席率 :
            {attendances
              ? 100 - (attendances.ABSENCE || 0) / AttendanceUsers.length
              : 'N/A'}
          </div>
          <div className="p-5 overflow-scroll">
            {AttendanceUsers?.length ? (
              AttendanceUsers.map((user, index) => (
                <div key={index}>
                  <div className="bg-gray-100 flex justify-between items-center p-3 rounded-lg mb-3 font-semibold text-lg">
                    <span className="flex justify-center items-center w-[450px]">
                      <span>{index + 1}.</span>
                      <div className="w-[35px] h-[35px] ml-3 rounded-full overflow-hidden">
                        <Image
                          src={user.ClassUser.User.Image}
                          width={35}
                          height={35}
                          alt="image"
                        />
                      </div>
                      <span className="w-[350px] text-start px-5">
                        {user.ClassUser.Nickname}
                      </span>
                    </span>

                    <span className="w-[120px]">{/* 기존 코드 유지 */}</span>
                  </div>
                </div>
              ))
            ) : (
              <div>No attendance data available.</div> // 데이터가 없을 때 보여줄 내용
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
