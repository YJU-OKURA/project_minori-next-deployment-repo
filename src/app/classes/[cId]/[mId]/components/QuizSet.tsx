'use client';
import {useEffect, useRef, useState} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation, Scrollbar, Autoplay} from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';
import getQuizSet from '@/src/api/quizSet/getQuizSet';
import {QuizList, Result} from '@/src/interfaces/quiz';
import postMark from '@/src/api/quizSet/postMark';
import Image from 'next/image';
import pngs from '@/public/images/quiz';
import getUserQuizInfo from '@/src/api/quizSet/getUserQuizInfo';
import SubmitQuiz from '@/src/interfaces/quiz/submitQuiz';
import getQuizFeedback from '@/src/api/quizFeedback/getQuizFeedback';
import {useRecoilValue} from 'recoil';
import userState from '@/src/recoil/atoms/userState';

const QuizSet = ({cId, mId}: {cId: number; mId: number}) => {
  SwiperCore.use([Navigation, Scrollbar, Autoplay]);
  const user = useRecoilValue(userState);
  const [userAnswers, setUserAnswers] = useState<Array<Record<string, string>>>(
    []
  );
  const [results, setResults] = useState<Result[]>([]);
  const [quizSet, setQuizSet] = useState<QuizList[]>([]);
  const [feedback, setFeedback] = useState<string>('');
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [isFeedback, setIsFeedback] = useState<boolean>(false);
  const [reload, setReload] = useState<boolean>(false);
  const [submitQuizList, setSubmitQuizList] = useState<SubmitQuiz[]>([]);
  const swiperRef = useRef<SwiperCore | null>(null);

  useEffect(() => {
    getQuizSet(cId, mId).then(res => {
      console.log(res);
      setQuizSet(res.quizList);
    });
    getUserQuizInfo(cId, mId, user.id)
      .then(res => {
        setIsSubmit(true);
        setSubmitQuizList(res.results);
        getQuizFeedback(cId, mId, user.id)
          .then(res => {
            console.log(res);
            setFeedback(res.data.content);
            setIsFeedback(true);
          })
          .catch(() => {
            console.log('not found');
            setIsFeedback(false);
          });
        console.log(res);
      })
      .catch(() => {
        setIsSubmit(false);
      });
  }, [reload]);

  const handleAnswer = (questionId: string, answer: string) => {
    setUserAnswers(prev => {
      const newAnswers = prev.map(item => {
        if (item[questionId]) {
          return {[questionId]: answer};
        } else {
          return item;
        }
      });

      if (!newAnswers.find(item => item[questionId])) {
        newAnswers.push({[questionId]: answer});
      }

      return newAnswers;
    });

    setResults(prev => {
      const quizItem = quizSet.find(quiz => quiz.id === questionId);
      const correctAnswer = quizItem?.content.commentary.correctAnswer;
      const isCorrect = answer === correctAnswer;

      const newResults = prev.map(item => {
        if (item.q_id === Number(questionId)) {
          return {q_id: Number(questionId), result: isCorrect};
        } else {
          return item;
        }
      });

      if (!newResults.find(item => item.q_id === Number(questionId))) {
        newResults.push({q_id: Number(questionId), result: isCorrect});
      }

      return newResults;
    });
  };

  const handleSubmitAnswer = () => {
    const currentTime = new Date();
    console.log(results);
    if (results && currentTime) {
      postMark(cId, mId, currentTime, results).then(res => {
        console.log(res);
        setReload(!reload);
      });
    }
    if (swiperRef.current) {
      swiperRef.current.slideTo(0); // 첫 번째 페이지로 이동
    }
  };

  return (
    <div className="py-2 w-[850px] m-auto">
      <Swiper
        onSwiper={swiper => (swiperRef.current = swiper)}
        slidesPerView={1} // 表示されるスライス数
        navigation={true} // prev, next button
        centeredSlides={true} // 中央揃え
      >
        {quizSet.map((quiz, index) => (
          <SwiperSlide key={quiz.id} style={{width: 'auto'}}>
            <div className="relative w-[750px] h-[800px] m-auto py-3">
              {isSubmit ? (
                <Image
                  src={submitQuizList[index].result ? pngs.true : pngs.false}
                  width={120}
                  height={100}
                  alt="icon"
                  className="absolute top-0 left-[-30px] z-20"
                ></Image>
              ) : null}
              <div className="text-lg font-medium p-1">질문</div>
              <div className="border-2 p-5 rounded-lg leading-8">
                {quiz.content.question}
              </div>
              <div className={isSubmit ? 'py-3 pointer-events-none' : 'py-3'}>
                <ul>
                  <li className="py-2">
                    <div
                      className="w-full border-2 p-5 rounded-lg text-m"
                      onClick={() => handleAnswer(quiz.id, 'a')}
                      style={
                        isSubmit &&
                        quiz.content.commentary.correctAnswer === 'a'
                          ? {color: '#1e90ff'}
                          : !isSubmit
                          ? {
                              color:
                                (userAnswers.find(answer => answer[quiz.id]) ||
                                  {})[quiz.id] === 'a'
                                  ? '#1e90ff'
                                  : 'black',
                            }
                          : {color: 'black'}
                      }
                    >
                      a. {quiz.content.answer.a}
                    </div>
                  </li>
                  <li className="py-2">
                    <div
                      className="w-full border-2 p-5 rounded-lg text-m"
                      onClick={() => handleAnswer(quiz.id, 'b')}
                      style={
                        isSubmit &&
                        quiz.content.commentary.correctAnswer === 'b'
                          ? {color: '#1e90ff'}
                          : !isSubmit
                          ? {
                              color:
                                (userAnswers.find(answer => answer[quiz.id]) ||
                                  {})[quiz.id] === 'b'
                                  ? '#1e90ff'
                                  : 'black',
                            }
                          : {color: 'black'}
                      }
                    >
                      b. {quiz.content.answer.b}
                    </div>
                  </li>
                  <li className="py-2">
                    <div
                      className="w-full border-2 p-5 rounded-lg text-m"
                      onClick={() => handleAnswer(quiz.id, 'c')}
                      style={
                        isSubmit &&
                        quiz.content.commentary.correctAnswer === 'c'
                          ? {color: '#1e90ff'}
                          : !isSubmit
                          ? {
                              color:
                                (userAnswers.find(answer => answer[quiz.id]) ||
                                  {})[quiz.id] === 'c'
                                  ? '#1e90ff'
                                  : 'black',
                            }
                          : {color: 'black'}
                      }
                    >
                      c. {quiz.content.answer.c}
                    </div>
                  </li>
                  <li className="py-2">
                    <div
                      className="w-full border-2 p-5 rounded-lg text-m"
                      onClick={() => handleAnswer(quiz.id, 'd')}
                      style={
                        isSubmit &&
                        quiz.content.commentary.correctAnswer === 'd'
                          ? {color: '#1e90ff'}
                          : !isSubmit
                          ? {
                              color:
                                (userAnswers.find(answer => answer[quiz.id]) ||
                                  {})[quiz.id] === 'd'
                                  ? '#1e90ff'
                                  : 'black',
                            }
                          : {color: 'black'}
                      }
                    >
                      d. {quiz.content.answer.d}
                    </div>
                  </li>
                </ul>
              </div>
              <div className="flex justify-between items-center relative py-1">
                <div className="">
                  {isSubmit ? (
                    <div className="h-[250px] bg-gray-100 w-full p-5 border-2 rounded-lg leading-8 drop-shadow-md overflow-scroll">
                      <div className="font-semibold">
                        정답:{' '}
                        <span className="text-red-500 ">
                          {quiz.content.commentary.correctAnswer}
                        </span>
                      </div>
                      <div className="font-semibold pt-2">
                        해설:{' '}
                        <span className="font-medium">
                          {quiz.content.commentary.content}
                        </span>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
        {isFeedback ? (
          <SwiperSlide style={{width: 'auto'}}>
            <div className="flex w-[750px] h-[800px] m-auto py-3 justify-center items-center">
              <div className="w-[600px] h-[200px] bg-gray-200 rounded-lg p-3 flex">
                <div className="font-bold h-[176px] mr-1">교수님의 말 : </div>
                <div className="grow">{feedback}</div>
              </div>
            </div>
          </SwiperSlide>
        ) : null}
      </Swiper>
      {isSubmit ? null : (
        <div className="flex justify-center">
          <button
            className="px-2 py-2 bg-blue-400 text-white rounded-lg"
            onClick={handleSubmitAnswer}
          >
            제출하기
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizSet;
