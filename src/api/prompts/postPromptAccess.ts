import req from '../apiUtils';

const postPromptAccess = async (cId: number, mId: number) => {
  const body = {
    m_id: mId,
  };

  const response = await req(`/class/${cId}/prompts`, 'post', 'nest', body);

  return response.data;
};

export default postPromptAccess;
