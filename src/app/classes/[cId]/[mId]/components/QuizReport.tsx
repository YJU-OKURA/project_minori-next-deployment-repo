import {useEffect, useState} from 'react';
import getRate from '@/src/api/quizSet/getRate';
import getUsers from '@/src/api/quizSet/getUsers';
import {Users} from '@/src/interfaces/quiz';
import QuizFeedback from './QuizFeedback';

const QuizReport = ({cId, mId}: {cId: number; mId: number}) => {
  const [users, setUsers] = useState<Users[]>([]);
  const [rate, setRate] = useState(0);
  const [isOpen, setIsOpen] = useState<boolean[]>([]);

  useEffect(() => {
    const data = getRate(cId, mId).then(res => {
      return res.attendRate;
    });
    const interval1 = setInterval(async () => {
      if (rate < (await data)) {
        setRate(rate + 1);
      } else {
        clearInterval(interval1);
      }
    }, 10);

    return () => {
      clearInterval(interval1);
    };
  }, [rate]);

  useEffect(() => {
    getUsers(cId, mId, 1, 5).then(res => {
      console.log(res);
      setUsers(res);
    });
  }, []);

  return (
    <div className="pl-[25px] flex">
      {/* ユーザーリスト */}
      <div className="w-4/6">
        {users.map((user, index) => (
          <div key={index}>
            <div
              className="bg-gray-100 flex justify-between items-center p-3 rounded-lg mb-3 font-semibold text-lg"
              onClick={() =>
                setIsOpen(prevState => ({...prevState, [user.u_id]: true}))
              }
            >
              <span className="flex justify-center items-center w-[100px]">
                {index + 1}.
                <div className="w-[35px] h-[35px] ml-3 rounded-full bg-red-400 overflow-hidden"></div>
              </span>
              <span className="w-[150px] text-center">{user.nickname}</span>
              <span className="w-[50px] text-center">{user.collectedRate}</span>
              <span
                className={
                  user.collectedRate === 'N/A'
                    ? 'w-[15px] h-[15px] rounded-full bg-red-400'
                    : 'w-[15px] h-[15px] rounded-full bg-green-400'
                }
              ></span>
            </div>
            {isOpen[user.u_id] ? (
              <QuizFeedback
                cId={cId}
                mId={mId}
                uId={user.u_id}
                setIsOpen={value =>
                  setIsOpen(prevState => ({...prevState, [user.u_id]: value}))
                }
              />
            ) : null}
          </div>
        ))}
      </div>
      {/* グラフ */}
      <div className="w-2/6 flex justify-center">
        <div
          className="inline-block w-[300px] h-[300px] rounded-full overflow-hidden flex justify-center items-center bg-gray-100 delay-300"
          style={{
            background: `conic-gradient(#4ADE80 0% ${rate}%, #F3F4F6 ${rate}% 100%)`,
          }}
        >
          <div className="w-[200px] h-[200px] bg-white rounded-full flex justify-center items-center">
            <span className="w-[15px] h-[15px] bg-green-400 rounded-full mr-1"></span>
            응시현황
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizReport;
