import req from '../apiUtils';

const getQuizSet = async (cId: number, mId: number) => {
  const response = await req(
    `/class/${cId}/material/${mId}/set-quiz/get`,
    'get',
    'nest'
  );

  return response.data;
};

export default getQuizSet;
