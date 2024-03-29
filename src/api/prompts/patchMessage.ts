import req from '../apiUtils';

const patchMessage = async (
  cId: number,
  id: number,
  mId: number,
  isSave: boolean
) => {
  const response = await req(
    `/class/${cId}/prompts/${id}/messages/${mId}?is_save=${isSave}`,
    'patch',
    'nest'
  );

  console.log(response);

  return response;
};

export default patchMessage;
