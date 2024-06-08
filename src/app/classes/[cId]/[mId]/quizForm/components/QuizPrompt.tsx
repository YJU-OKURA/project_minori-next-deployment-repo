import {Quiz} from '@/src/interfaces/quiz';

const QuizPrompt = ({props}: {props: Quiz}) => {
  return (
    <div className="p-2">
      <div className="bg-gray-200 w-full drop-shadow-md p-2">
        <span className="font-semibold text-lg">Question</span>
        <div>{props.question}</div>
        <span className="font-semibold text-lg">Answer</span>
        <div>A. {props.answer.a}</div>
        <div>B. {props.answer.b}</div>
        <div>C. {props.answer.c}</div>
        <div>D. {props.answer.d}</div>
        <div className="font-semibold text-lg">
          CorrectAnswer:
          <span className="text-red-500 px-2">
            {props.commentary.correctAnswer}
          </span>
        </div>
        <span className="font-semibold text-lg">Commentary</span>
        <div>{props.commentary.content}</div>
        {/* <div className="text-blue-600 pt-2 font-medium">
              참조 페이지 : 1, 3, 5
            </div> */}
      </div>
    </div>
  );
};

export default QuizPrompt;
