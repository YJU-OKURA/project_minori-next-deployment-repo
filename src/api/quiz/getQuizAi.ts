import req from '../apiUtils';

const getQuizAi = async (cId: number, mId: number) => {
  const response = await req(
    `/class/${cId}/quizzes/material/${mId}/get-quiz`,
    'get',
    'nest'
  );
  return response.data;
};

export default getQuizAi;
