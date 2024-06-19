import req from '../apiUtils';

const getAttendances = async (cId: number) => {
  const response = await req(`/at/${cId}`, 'get', 'gin');

  return response;
};

export default getAttendances;
