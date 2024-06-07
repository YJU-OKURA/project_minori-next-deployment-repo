import req from '../apiUtils';

const getUserQuizInfo = async (cId: number, mId: number, uId: number) => {
  const response = await req(
    `/class/${cId}/material/${mId}/set-quiz/result/user/${uId}`,
    'get',
    'nest'
  );

  return response.data;
};

export default getUserQuizInfo;
