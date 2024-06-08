import req from '../apiUtils';

const postSetQuiz = async (
  cId: number,
  mId: number,
  qIds: number[],
  date: string
) => {
  const body = {
    deadline: date,
    setQuizData: qIds,
  };
  const response = await req(
    `/class/${cId}/material/${mId}/set-quiz/post`,
    'post',
    'nest',
    body
  );

  return response;
};

export default postSetQuiz;
