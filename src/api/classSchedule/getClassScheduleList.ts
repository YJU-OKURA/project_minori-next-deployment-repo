import req from '../apiUtils';

const getClassScheduleList = async (classCode: number) => {
  const response = await req(`/cs?cid=${classCode}`, 'get', 'gin');

  return response;
};

export default getClassScheduleList;
