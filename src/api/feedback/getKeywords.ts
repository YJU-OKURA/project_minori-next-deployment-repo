import req from '../apiUtils';

const getKeywords = async (cId: number, mId: number) => {
  const response = await req(
    `/class/${cId}/feedback/materials/${mId}/get-keyword`,
    'get',
    'nest'
  );

  return response.data;
};

export default getKeywords;
