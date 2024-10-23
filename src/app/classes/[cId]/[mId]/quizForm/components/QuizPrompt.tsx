import {Quiz} from '@/src/interfaces/quiz';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation, Scrollbar, Autoplay} from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';

const QuizPrompt = ({props}: {props: Quiz[]}) => {
  SwiperCore.use([Navigation, Scrollbar, Autoplay]);

  return (
    <div className="p-2">
      <div className="max-w-[500px] bg-gray-200 w-full drop-shadow-md p-2">
        <Swiper
          slidesPerView={1} // 表示されるスライス数
          navigation={true} // prev, next button
          centeredSlides={true} // 中央揃え
        >
          {props.map((quiz, index) => (
            <SwiperSlide key={index}>
              <div className="w-[350px] h-[500px] drop-shadow-lg overflow-scroll m-auto my-3">
                <div className="p-2 text-start">
                  <span className="font-semibold text-lg">Question</span>
                  <div>{quiz.question}</div>
                  <span className="font-semibold text-lg">Answer</span>
                  <div>a. {quiz.answer.a}</div>
                  <div>b. {quiz.answer.b}</div>
                  <div>c. {quiz.answer.c}</div>
                  <div>d. {quiz.answer.d}</div>
                  <div className="font-semibold text-lg">
                    <span>CorrectAnswer:</span>
                    <span className="text-red-500 px-2">
                      {quiz.commentary.correctAnswer}
                    </span>
                  </div>
                  <div>
                    <span className="text-lg font-semibold">Commentary : </span>
                    {quiz.commentary.content}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default QuizPrompt;
