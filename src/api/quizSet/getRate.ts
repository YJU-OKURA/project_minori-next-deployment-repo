import req from '../apiUtils';

const getRate = async (cId: number, mId: number) => {
  const response = await req(
    `/class/${cId}/material/${mId}/set-quiz/statistics/class`,
    'get',
    'nest'
  );

  return response.data;
};

export default getRate;
