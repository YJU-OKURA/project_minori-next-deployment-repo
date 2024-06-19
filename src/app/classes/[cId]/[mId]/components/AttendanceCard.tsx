import getClassMember from '@/src/api/classUser/getClassMember';
import {useEffect, useState} from 'react';
import {ClassUser} from '@/src/interfaces/user';
import {Attendance} from '@/src/interfaces/attendance';
import postAttendance from '@/src/api/attendance/postAttendance';

const AttendanceCard = ({cid}: {cid: number; uid: number}) => {
  const [users, setUsers] = useState<ClassUser[]>([]);
  const [submitUsers, setSubmitUsers] = useState<Attendance[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    getClassMember(cid).then(res => {
      console.log(res);
      setUsers(res);

      // コンポーネントを結合した後、値を受け取って使用するように修正する必要があります。
      const uids = res.map((user: ClassUser) => ({
        uid: user.uid,
        cid: cid,
        csid: 19,
        status: '',
      }));
      setSubmitUsers(uids);
    });
  }, []);

  const handleClickStatus = (id: number, status: string) => {
    const updatedUsers = submitUsers.map(user =>
      user.uid === id ? {...user, status: status} : user
    );
    console.log(updatedUsers);
    setSubmitUsers(updatedUsers);
  };

  const handleClickSave = () => {
    postAttendance(submitUsers).then(() => {
      console.log('save');
      setIsOpen(false);
    });
  };

  return (
    <div>
      <div>
        <button
          className="px-3 py-1 bg-blue-400 text-white rounded-lg"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          출석부
        </button>
      </div>
      {isOpen ? (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50">
          <div
            className=" bg-white rounded-lg w-[500px] h-[630px] px-4 py-10 box-border"
            id="modal-container"
          >
            <div className="text-center text-lg text-gray-500">출석부</div>
            <div className="relative h-[calc(100%-28px)]">
              {users.map((user, index) => (
                <div
                  className="border-b-2 flex justify-between items-center p-2"
                  key={index}
                >
                  <span className="w-[30px] text-center">{index + 1}.</span>
                  <div className="w-[200px] text-start">
                    <p className="text-clip overflow-hidden">{user.nickname}</p>
                  </div>
                  <div>
                    <button
                      className="px-3 hover:bg-gray-200 border-s-2"
                      onClick={() => handleClickStatus(user.uid, 'ATTENDANCE')}
                    >
                      출석
                    </button>
                    <button
                      className="px-2 hover:bg-gray-200 border-s-2"
                      onClick={() => handleClickStatus(user.uid, 'TARDY')}
                    >
                      지각
                    </button>
                    <button
                      className="px-2 hover:bg-gray-200 border-s-2"
                      onClick={() => handleClickStatus(user.uid, 'ABSENCE')}
                    >
                      결석
                    </button>
                  </div>
                </div>
              ))}
              <div className="absolute w-full bottom-0 pt-2 flex justify-center ">
                <button
                  className="px-3 py-1 bg-red-400 text-white rounded-lg mr-4"
                  onClick={() => {
                    setIsOpen(false);
                  }}
                >
                  닫기
                </button>
                <button
                  className="px-3 py-1 bg-blue-400 text-white rounded-lg"
                  onClick={handleClickSave}
                >
                  저장
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default AttendanceCard;
