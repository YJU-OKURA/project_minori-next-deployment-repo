import {StorageMessage} from '@/src/interfaces/prompt';
import req from '../apiUtils';

const getMessage = async (
  cId: number,
  id: number,
  pageNumber: number,
  limitNumber: number
): Promise<StorageMessage[]> => {
  const response = await req(
    `/class/${cId}/prompts/${id}/messages/saved?page=${pageNumber}&limit=${limitNumber}`,
    'get',
    'nest'
  );

  console.log(response);

  return response.data.messages;
};

export default getMessage;
