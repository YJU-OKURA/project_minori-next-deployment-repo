import req from '../apiUtils';

const getClassSchedule = async (scheduleCode: number) => {
  const response = await req(`/cs/${scheduleCode}`, 'get', 'gin');

  return response.data;
};

export default getClassSchedule;
