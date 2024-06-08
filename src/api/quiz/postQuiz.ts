import {Quiz} from '@/src/interfaces/quiz';
import req from '../apiUtils';

const postQuiz = async (cId: number, mId: number, data: Quiz) => {
  const body = {
    content: data,
  };

  console.log(body);

  const response = await req(
    `/class/${cId}/quizzes/material/${mId}`,
    'post',
    'nest',
    body
  );

  return response;
};

export default postQuiz;
