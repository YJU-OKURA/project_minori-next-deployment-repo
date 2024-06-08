import req from '../apiUtils';
import {Result} from '@/src/interfaces/quiz';

const postMark = async (
  cId: number,
  mId: number,
  date: Date,
  answers: Result[]
) => {
  const body = {
    created_at: date.toISOString(),
    quizResults: answers,
  };

  console.log(body);

  const response = req(
    `/class/${cId}/material/${mId}/set-quiz/mark`,
    'post',
    'nest',
    body
  );

  return response;
};

export default postMark;
