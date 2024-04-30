import req from '../apiUtils';

const getCheckRefer = async (cId: number, mId: number): Promise<boolean> => {
  const response = await req(
    `/class/${cId}/feedback/materials/${mId}/check-refer`,
    'get',
    'nest'
  );

  console.log(response);

  return response;
};

export default getCheckRefer;
