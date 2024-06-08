import req from '../apiUtils';

const getQuizFeedback = async (cId: number, mId: number, uId: number) => {
  const response = await req(
    `/class/${cId}/material/${mId}/quiz-feedback/user/${uId}`,
    'get',
    'nest'
  );

  return response;
};

export default getQuizFeedback;
