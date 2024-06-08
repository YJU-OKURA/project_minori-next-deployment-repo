import req from '../apiUtils';

const getUsers = async (
  cId: number,
  mId: number,
  pageNumber: number,
  limitNumber: number
) => {
  const response = await req(
    `/class/${cId}/material/${mId}/set-quiz/statistics/users?page=${pageNumber}&limit=${limitNumber}`,
    'get',
    'nest'
  );

  return response.data;
};

export default getUsers;
