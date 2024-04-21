import req from '../apiUtils';

const getClassBoardList = async (
  classCode: number,
  pageNum: number,
  pageSize: number
) => {
  const totalResponse = await req(
    `/cb?cid=${classCode}&pageSize=99`,
    'get',
    'gin'
  );

  const totalPosts = totalResponse.data.length;

  const response = await req(
    `/cb?cid=${classCode}&page=${pageNum}&pageSize=${pageSize}`,
    'get',
    'gin'
  );

  return {
    data: response.data,
    total: totalPosts,
  };
};

export default getClassBoardList;
