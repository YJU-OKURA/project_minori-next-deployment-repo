import req from '../apiUtils';

const deleteQuizSet = async (cId: number, mId: number) => {
  const response = await req(
    `/class/${cId}/material/${mId}/set-quiz`,
    'delete',
    'nest'
  );

  return response.data;
};

export default deleteQuizSet;
