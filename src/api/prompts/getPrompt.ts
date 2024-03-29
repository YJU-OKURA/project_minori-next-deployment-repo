import req from '../apiUtils';
import {PromptMessages} from '@/src/interfaces/prompt';

const getPrompt = async (
  cId: number,
  id: number,
  pageNumber: number,
  limitNumber: number
): Promise<PromptMessages> => {
  const response = await req(
    `/class/${cId}/prompts/${id}?page=${pageNumber}&limit=${limitNumber}`,
    'get',
    'nest'
  );

  console.log(response);

  return response.data;
};

export default getPrompt;
