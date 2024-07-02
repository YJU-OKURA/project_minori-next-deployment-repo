import {useEffect, useState} from 'react';
import Image from 'next/image';
import getUserQuizInfo from '@/src/api/quizSet/getUserQuizInfo';
import SubmitQuiz from '@/src/interfaces/quiz/submitQuiz';
import pngs from '@/public/images/quiz';
import postQuizFeedback from '@/src/api/quizFeedback/postQuizFeedback';
import getQuizFeedback from '@/src/api/quizFeedback/getQuizFeedback';

const QuizFeedback = ({
  cId,
  mId,
  uId,
  setIsOpen,
}: {
  cId: number;
  mId: number;
  uId: number;
  setIsOpen: (value: boolean) => void;
}) => {
  const [submitQuizList, setSubmitQuizList] = useState<SubmitQuiz[]>([]);
  const [feedback, setFeedback] = useState<string>('');
  const [collectRate, setCollectRate] = useState<number>(0);
  const [isWrite, setIsWrite] = useState<boolean>(false);

  useEffect(() => {
    getQuizFeedback(cId, mId, uId)
      .then(res => {
        console.log(res);
        setFeedback(res.data.content);
        setIsWrite(true);
      })
      .catch(() => {
        console.log('error');
        setIsWrite(false);
      });
    getUserQuizInfo(cId, mId, uId).then(res => {
      console.log(res);
      setSubmitQuizList(res.results);
      setCollectRate(res.collectRate);
    });
  }, []);

  const handleCreateFeedback = () => {
    console.log(feedback, uId);
    postQuizFeedback(cId, mId, uId, feedback).then(() => {
      console.log('success');
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className=" bg-white rounded-lg w-[700px] h-[530px] p-10 box-border"
        id="modal-container"
      >
        <div>
          <div className="text-xl font-semibold">OOさんが投稿したクイズ</div>
          <div className="py-3">
            <p className="pb-2">OOさんへのフィードバック</p>
            {isWrite ? (
              <div>{feedback}</div>
            ) : (
              <div className="flex justify-between items-end">
                <input
                  type="text"
                  className="w-[550px] p-2 outline-none border-2 border-gray-400 rounded-lg"
                  value={feedback}
                  onChange={e => setFeedback(e.target.value)}
                />
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold"
                  onClick={handleCreateFeedback}
                >
                  作成
                </button>
              </div>
            )}
          </div>
          <div className="h-[280px] overflow-scroll">
            <div className="font-bold py-2">
              正解率 :{' '}
              <span
                className={
                  collectRate >= 50 ? 'text-green-500' : 'text-red-500'
                }
              >
                {collectRate}%
              </span>
            </div>
            {submitQuizList.map((submitQuiz, index) => (
              <div key={index}>
                <div className="relative p-[6px]">
                  <span className="">{index + 1}.</span>
                  <Image
                    src={submitQuiz.result ? pngs.true : pngs.false}
                    alt="true"
                    width={35}
                    height={35}
                    className="absolute top-0 left-[-2px]"
                    style={{height: '35px'}}
                  />
                  {submitQuiz.content.question}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center">
          <button
            className="p-2 border border-gray-500 rounded-lg"
            onClick={() => setIsOpen(false)}
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizFeedback;
