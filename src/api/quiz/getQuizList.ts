import req from '../apiUtils';

const getQuizList = async (
  cId: number,
  mId: number,
  pageNumber: number,
  limitNumber: number
) => {
  const response = await req(
    `/class/${cId}/quizzes/material/${mId}?page=${pageNumber}&limit=${limitNumber}`,
    'get',
    'nest'
  );

  return response.data;
};

export default getQuizList;
