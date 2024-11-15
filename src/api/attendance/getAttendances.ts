import req from '../apiUtils';

const getAttendances = async (csId: number) => {
  const response = await req(`/attendances/schedule/${csId}`, 'get', 'gin');

  return response.data;
};

export default getAttendances;
