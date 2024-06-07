import Answer from './answer';
import Commentary from './commentary';

interface Quiz {
  question: string;
  answer: Answer;
  commentary: Commentary;
}

export default Quiz;
