import req from '../apiUtils';

const deleteQuizFeedback = async (cId: number, mId: number, uId: number) => {
  const body = {
    u_id: uId,
  };

  const response = await req(
    `/class/${cId}/material/${mId}/quiz-feedback}`,
    'delete',
    'nest',
    body
  );

  return response;
};

export default deleteQuizFeedback;
