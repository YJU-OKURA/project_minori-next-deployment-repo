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

const QuizSet = ({cId, mId}: {cId: number; mId: number}) => {
  SwiperCore.use([Navigation, Scrollbar, Autoplay]);

  const [userAnswers, setUserAnswers] = useState<Array<Record<string, string>>>(
    []
  );
  const [results, setResults] = useState<Result[]>([]);
  const [quizSet, setQuizSet] = useState<QuizList[]>([]);
  const [isGrade, setIsGrade] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const swiperRef = useRef<SwiperCore | null>(null);

  useEffect(() => {
    getQuizSet(cId, mId).then(res => {
      console.log(res);
      setQuizSet(res.quizList);
    });
  }, []);

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
        setIsGrade(true);
      });
    }
    if (swiperRef.current) {
      swiperRef.current.slideTo(0); // 첫 번째 페이지로 이동
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="py-2 w-[850px] m-auto">
      <Swiper
        onSwiper={swiper => (swiperRef.current = swiper)}
        slidesPerView={1} // 表示されるスライス数
        navigation={true} // prev, next button
        centeredSlides={true} // 中央揃え
      >
        {quizSet.map(quiz => (
          <SwiperSlide key={quiz.id} style={{width: 'auto'}}>
            <div className="relative w-[750px] m-auto py-3">
              {isGrade ? (
                <Image
                  src={
                    results.find(answer => answer.q_id === parseInt(quiz.id))
                      ?.result
                      ? pngs.true
                      : pngs.false
                  }
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
              <div className="py-3">
                <div className="flex justify-between items-center relative py-1">
                  <div className="">
                    {isGrade ? (
                      <button
                        className="border-2 p-2 rounded-lg bg-gray-100 text-sm"
                        onClick={toggleDropdown}
                      >
                        해설 보기
                      </button>
                    ) : null}
                    {isOpen ? (
                      <div className="absolute top-12 right-0 bg-gray-100 w-full p-5 border-2  rounded-lg leading-8 drop-shadow-md">
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
                <ul>
                  <li className="py-2">
                    <div
                      className="w-full border-2 p-5 rounded-lg text-m"
                      onClick={() => handleAnswer(quiz.id, 'a')}
                      style={{
                        color:
                          (userAnswers.find(answer => answer[quiz.id]) || {})[
                            quiz.id
                          ] === 'a'
                            ? '#1e90ff'
                            : 'black',
                      }}
                    >
                      a. {quiz.content.answer.a}
                    </div>
                  </li>
                  <li className="py-2">
                    <div
                      className="w-full border-2 p-5 rounded-lg text-m"
                      onClick={() => handleAnswer(quiz.id, 'b')}
                      style={{
                        color:
                          (userAnswers.find(answer => answer[quiz.id]) || {})[
                            quiz.id
                          ] === 'b'
                            ? '#1e90ff'
                            : 'black',
                      }}
                    >
                      b. {quiz.content.answer.b}
                    </div>
                  </li>
                  <li className="py-2">
                    <div
                      className="w-full border-2 p-5 rounded-lg text-m"
                      onClick={() => handleAnswer(quiz.id, 'c')}
                      style={{
                        color:
                          (userAnswers.find(answer => answer[quiz.id]) || {})[
                            quiz.id
                          ] === 'c'
                            ? '#1e90ff'
                            : 'black',
                      }}
                    >
                      c. {quiz.content.answer.c}
                    </div>
                  </li>
                  <li className="py-2">
                    <div
                      className="w-full border-2 p-5 rounded-lg text-m"
                      onClick={() => handleAnswer(quiz.id, 'd')}
                      style={{
                        color:
                          (userAnswers.find(answer => answer[quiz.id]) || {})[
                            quiz.id
                          ] === 'd'
                            ? '#1e90ff'
                            : 'black',
                      }}
                    >
                      d. {quiz.content.answer.d}
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex justify-center">
        <button
          className="px-2 py-2 bg-blue-400 text-white rounded-lg"
          onClick={handleSubmitAnswer}
        >
          제출하기
        </button>
      </div>
    </div>
  );
};

export default QuizSet;
