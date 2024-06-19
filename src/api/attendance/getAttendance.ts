import req from '../apiUtils';

const getAttendance = async (csId: number) => {
  const response = await req(`/at/attendance/${csId}`, 'get', 'gin');

  return response;
};

export default getAttendance;
