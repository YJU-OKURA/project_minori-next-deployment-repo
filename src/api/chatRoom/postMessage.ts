import req from '../apiUtils';

const postMessage = async (
  scheduleId: number,
  user: string,
  message: string
) => {
  const formData = new FormData();
  formData.append('user', user);
  formData.append('message', message);
  const response = await req(
    `/chat/room/${scheduleId}`,
    'post',
    'gin',
    formData
  );

  return response.data;
};

export default postMessage;
