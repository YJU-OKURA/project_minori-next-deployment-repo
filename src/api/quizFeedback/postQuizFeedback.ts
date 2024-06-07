import req from '../apiUtils';

const postQuizFeedback = async (
  cId: number,
  mId: number,
  uId: number,
  content: string
) => {
  const body = {
    content: content,
    u_id: uId,
  };
  const response = await req(
    `/class/${cId}/material/${mId}/quiz-feedback`,
    'post',
    'nest',
    body
  );

  return response.data;
};

export default postQuizFeedback;
