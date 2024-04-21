import req from '../apiUtils';
import {Material} from '@/src/interfaces/navbar';

const searchMaterial = async (
  cId: number,
  keyWord: string,
  page: number,
  limit: number
): Promise<Material[]> => {
  const response = await req(
    `/class/${cId}/materials/search?name=${keyWord}&page=${page}&limit=${limit}`,
    'get',
    'nest'
  );

  return response.data;
};

export default searchMaterial;
