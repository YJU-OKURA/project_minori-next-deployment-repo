import req from '../apiUtils';

const getQuizAi = async (cId: number, mId: number) => {
  const response = await req(
    `/class/${cId}/quizzes/material/${mId}/recommend-quizzes`,
    'get',
    'nest'
  );
  return response.data.quizzes;
};

export default getQuizAi;
