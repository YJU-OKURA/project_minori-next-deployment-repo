import req from '../apiUtils';

const getClassAnnounced = async (classCode: number) => {
  const response = await req(`/cb/announced?cid=${classCode}`, 'get', 'gin');

  return response;
};

export default getClassAnnounced;
