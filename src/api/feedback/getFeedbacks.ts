import req from '../apiUtils';

const getFeedbacks = async (
  cId: number,
  mId: number,
  pageNumber: number,
  limitNumber: number
) => {
  const response = await req(
    `/class/${cId}/feedback/materials/${mId}?page=${pageNumber}&limit=${limitNumber}`,
    'get',
    'nest'
  );

  return response.data;
};

export default getFeedbacks;
