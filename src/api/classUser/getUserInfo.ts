import req from '../apiUtils';

const getUserInfo = async (uid: number, cid: number) => {
  const response = await req(`/cu/${uid}/${cid}/info`, 'get', 'gin');

  return response.data;
};

export default getUserInfo;
