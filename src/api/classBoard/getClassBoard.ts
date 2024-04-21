import req from '../apiUtils';

const getClassBoardList = async (postId: number) => {
  const response = await req(`/cb/${postId}`, 'get', 'gin');

  return response.data;
};

export default getClassBoardList;
