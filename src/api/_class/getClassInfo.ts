import req from '@/src/api/apiUtils';

const getClassInfo = async (cid: number) => {
  const response = await req(`/cl/${cid}`, 'get', 'gin');

  return response;
};

export default getClassInfo;
