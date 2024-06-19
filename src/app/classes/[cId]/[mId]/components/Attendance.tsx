import icons from '@/public/svgs/attendance';
import getAttendance from '@/src/api/attendance/getAttendance';
import postAttendance from '@/src/api/attendance/postAttendance';
import type {Attendance, AttendanceUser} from '@/src/interfaces/attendance';
import Image from 'next/image';
import {useEffect, useState} from 'react';

const Attendance = () => {
  const [AttendanceUsers, setAttendanceUsers] = useState<AttendanceUser[]>([]);
  const [isModify, setIsModify] = useState<boolean[]>([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [isReload, setIsReload] = useState<boolean>(false);
  console.log(isModify);

  useEffect(() => {
    getAttendance(10).then(res => {
      console.log(res.data);
      setAttendanceUsers(res.data);
      setSelectedOption(res.data[0].IsAttendance);
      setIsModify(new Array(res.data.length).fill(false));
    });
  }, [isReload]);

  const handleClickModify = (
    uid: number,
    cid: number,
    csid: number,
    status: string
  ) => {
    console.log(uid, cid, csid, status);
    const user: Attendance[] = [
      {
        uid: uid,
        cid: cid,
        csid: csid,
        status: status,
      },
    ];

    if (user)
      postAttendance(user).then(res => {
        setIsReload(!isReload);
        console.log(res);
      });
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const isModifyOpen = (index: number) => {
    console.log(index);
    setIsModify(prev => prev.map((open, i) => (i === index ? !open : open))); // クリックしたコメントの開閉状態を反転
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        className=" bg-white rounded-lg w-[800px] h-[600px] py-[30px] box-border flex items-center"
        id="modal-container"
      >
        <div className="w-full h-[500px]">
          <div className="text-xl font-semibold text-center">Attendance</div>
          <div className="text-lg font-semibold text-green-400 text-center">
            출석률 : 100%
          </div>
          <div className="p-5 overflow-scroll">
            {AttendanceUsers.map((user, index) => (
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
                      />{' '}
                    </div>
                    <span className="w-[350px] text-start px-5">
                      {user.ClassUser.Nickname}
                    </span>
                  </span>

                  <span className="w-[120px]">
                    {isModify[index] ? (
                      <div className="flex">
                        <select
                          name=""
                          id=""
                          onChange={handleSelectChange}
                          value={user.IsAttendance}
                        >
                          <option value="ATTENDANCE">출석</option>
                          <option value="TARDY">지각</option>
                          <option value="ABSENCE">결석</option>
                        </select>
                        <div>
                          <button
                            className="px-2"
                            onClick={() =>
                              handleClickModify(
                                user.UID,
                                user.CID,
                                user.CSID,
                                selectedOption
                              )
                            }
                          >
                            수정
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <div>
                          {user.IsAttendance === 'ATTENDANCE'
                            ? '출석'
                            : user.IsAttendance === 'TARDY'
                            ? '지각'
                            : '결석'}
                        </div>
                        <span
                          className="px-2"
                          onClick={() => {
                            isModifyOpen(index);
                          }}
                        >
                          <Image
                            src={icons.edit}
                            width={20}
                            height={20}
                            alt="icon"
                            className="opacity-60"
                          />
                        </span>
                      </div>
                    )}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
