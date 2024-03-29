import req from '../apiUtils';

const postPrompt = async (cId: number, id: number, message: string) => {
  const body = {
    message: message,
  };
  const response = await req(
    `/class/${cId}/prompts/${id}`,
    'post',
    'nest',
    body
  );

  console.log(response);

  return response;
};

export default postPrompt;
