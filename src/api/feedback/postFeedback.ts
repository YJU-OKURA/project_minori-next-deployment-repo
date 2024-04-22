import req from '../apiUtils';

const postFeedback = async (cId: number, mId: number, content: string) => {
  const body = {
    content: content,
  };
  const response = await req(
    `/class/${cId}/feedback/materials/${mId}`,
    'post',
    'nest',
    body
  );

  return response.data;
};

export default postFeedback;
