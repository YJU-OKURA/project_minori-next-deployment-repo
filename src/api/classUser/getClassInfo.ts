import req from '../apiUtils';

const getClassInfo = async (uId: number, cId: number) => {
  const response = await req(`/cu/${uId}/${cId}/info`, 'get', 'gin');

  return response;
};

export default getClassInfo;
