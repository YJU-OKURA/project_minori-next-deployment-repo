import req from '../apiUtils';

const getMessages = async (scheduleId: number) => {
  const response = await req(`/chat/messages/${scheduleId}`, 'get', 'gin');
  return response;
};

export default getMessages;
