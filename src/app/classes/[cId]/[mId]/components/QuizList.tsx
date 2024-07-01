import {useEffect, useState} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import moment from 'moment';
import CalendarModal from './CalendarModal';
import deleteQuiz from '@/src/api/quiz/deleteQuiz';
import getQuizList from '@/src/api/quiz/getQuizList';
import postSetQuiz from '@/src/api/quizSet/postSetQuiz';
import deleteQuizSet from '@/src/api/quizSet/deleteQuizSet';
import type {QuizList} from '@/src/interfaces/quiz';
import icons from '@/public/svgs/quiz';
import QuizReport from './QuizReport';
import getQuizSet from '@/src/api/quizSet/getQuizSet';

const QuizList = (props: {cId: number; mId: number; mName: string}) => {
  const eng = ['a', 'b', 'c', 'd'];
  const [isShow, setIsShow] = useState<boolean>(true);
  const [isReportShow, setIsReportShow] = useState<boolean>(true);
  const [quizList, setQuizList] = useState<QuizList[]>([]);
  const [deadLine, setDeadLine] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isQuizOpen, setIsQuizOpen] = useState<boolean[]>([]);
  const [reload, setReload] = useState<boolean>(false);
  const [quizIds, setQuizIds] = useState<number[]>([]);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  useEffect(() => {
    getQuizData();
  }, [reload]);

  const getQuizData = () => {
    getQuizSet(props.cId, props.mId)
      .then(res => {
        console.log(res);
        setQuizList(res.quizList);
        setIsQuizOpen(new Array(res.length).fill(false));
        setIsSubmit(true);
        setDeadLine(res.deadline);
      })
      .catch(() => {
        getQuizList(props.cId, props.mId, 1, 5).then(res => {
          console.log(res);
          setQuizList(res);
          setIsQuizOpen(new Array(res.length).fill(false));
          setIsSubmit(false);
        });
      });
  };

  const handleDeleteQuiz = (qId: string) => {
    console.log('delete');
    deleteQuiz(props.cId, parseInt(qId)).then(() => {
      setReload(!reload);
    });
  };

  const handleCheckboxChange = (id: number, isChecked: boolean) => {
    console.log(id, isChecked);
    if (isChecked) {
      setQuizIds([...quizIds, id]);
    } else {
      setQuizIds(quizIds.filter(quizId => quizId !== id));
    }
  };

  const toggleDropdown = (index: number) => {
    console.log(index);
    setIsQuizOpen(prev => prev.map((open, i) => (i === index ? !open : open))); // クリックしたコメントの開閉状態を反転
  };

  const handleSubmitQuiz = () => {
    console.log(deadLine);
    console.log(quizIds);
    postSetQuiz(props.cId, props.mId, quizIds, deadLine).then(() => {
      console.log('success');
      setReload(!reload);
    });
  };

  const handleDeleteSet = () => {
    deleteQuizSet(props.cId, props.mId).then(() => {
      setDeadLine('');
      setQuizIds([]);
      setReload(!reload);
    });
  };

  return (
    <div className="px-3">
      <div className="flex items-center">
        <div
          className="flex items-center text-xl font-medium"
          onClick={() => setIsShow(!isShow)}
        >
          <Image
            src={isShow ? icons.more : icons.normal}
            width={25}
            height={25}
            alt="icon"
          />
          <span>クイズリスト</span>
        </div>
        {isSubmit ? null : (
          <div className="w-6 h-6 flex justify-center items-center bg-blue-500 text-white text-xl font-medium rounded-lg ml-4">
            <Link
              href={`/classes/${props.cId}/${props.mName}/quizForm?mId=${props.mId}`}
            >
              <Image
                src={icons.plus}
                width={20}
                height={20}
                alt="icon"
                style={{width: '20px', height: '20px'}}
              />
            </Link>
          </div>
        )}
      </div>
      <div className={isShow ? '' : 'hidden'}>
        <div className="flex items-center pl-[25px] py-2 ">
          <span className="pr-2 font-semibold">締め切り :</span>
          {isSubmit ? (
            <div className="text-red-500 font-semibold">
              {moment(deadLine).format('YYYY-MM-DD / HH:mm')}
            </div>
          ) : (
            <div>
              <button
                className="bg-gray-200 rounded-lg px-2 py-1"
                onClick={() => {
                  setIsOpen(true);
                }}
              >
                {deadLine
                  ? moment(deadLine).format('YYYY-MM-DD / HH:mm')
                  : '期限を設定してください'}
              </button>
              {isOpen ? (
                <CalendarModal
                  setDeadLine={setDeadLine}
                  setIsOpen={setIsOpen}
                />
              ) : null}
            </div>
          )}
        </div>
        <div className="py-2 px-[25px]">
          {quizList.map((quiz, index) => (
            <div key={index}>
              <div className="flex">
                {isSubmit ? null : (
                  <input
                    type="checkbox"
                    className="w-5 mr-2"
                    onChange={event =>
                      handleCheckboxChange(
                        parseInt(quiz.id),
                        event.target.checked
                      )
                    }
                  ></input>
                )}

                <div className="w-full flex items-center border-2 p-4 rounded-lg mt-2">
                  <div className="w-full" onClick={() => toggleDropdown(index)}>
                    {quiz.content.question}
                  </div>
                  <span onClick={() => handleDeleteQuiz(quiz.id)}>
                    <Image
                      src={icons.delete}
                      width={25}
                      height={25}
                      alt="delete"
                    />
                  </span>
                </div>
              </div>
              {isQuizOpen[index] ? (
                <div
                  className={
                    isSubmit ? 'w-full' : 'ml-[28px] w-[calc(100%-28px)]'
                  }
                >
                  {isQuizOpen[index] && (
                    <div className="w-full border-2 p-4 rounded-lg bg-gray-100">
                      {Object.values(quiz.content.answer).map(
                        (answer, index) => (
                          <div key={index}>
                            <span className="font-semibold">
                              {eng[index]}.{' '}
                            </span>
                            {answer}
                          </div>
                        )
                      )}
                      <div className="font-semibold pt-2">
                        正解: {quiz.content.commentary.correctAnswer}
                      </div>
                      <p>
                        <span className="font-semibold">解説: </span>
                        {quiz.content.commentary.content}
                      </p>
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          ))}
        </div>
        <div className="flex py-3 px-[25px]">
          {isSubmit ? (
            <button
              className="py-2 px-4 bg-red-500 text-white rounded-3xl"
              onClick={handleDeleteSet}
            >
              クイズの削除
            </button>
          ) : (
            <button
              className="py-2 px-4 bg-blue-500 text-white rounded-3xl"
              onClick={handleSubmitQuiz}
            >
              クイズ出題
            </button>
          )}
        </div>
      </div>

      <div className="py-5">
        <div className="flex items-center">
          <div
            className="flex items-center text-xl font-medium"
            onClick={() => setIsReportShow(!isReportShow)}
          >
            <Image
              src={isReportShow ? icons.more : icons.normal}
              width={25}
              height={25}
              alt="icon"
            />
            <span>クイズ統計</span>
          </div>
        </div>
      </div>
      {/* Report */}
      <div className={isReportShow ? '' : 'hidden'}>
        {isSubmit ? (
          <div>
            <QuizReport cId={props.cId} mId={props.mId} />
          </div>
        ) : (
          <div className="h-[100px] flex justify-center items-center text-2xl text-gray-300 font-normal">
            まだクイズは出題されていません。
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizList;
