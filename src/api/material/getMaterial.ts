import req from '../apiUtils';
import {Material} from '@/src/interfaces/navbar';

const getMaterial = async (
  classId: number,
  pageNumber: number,
  limitNumber: number
): Promise<Material[]> => {
  const response = await req(
    `/class/${classId}/materials?page=${pageNumber}&limit=${limitNumber}`,
    'get'
  );

  return response.data;
};

export default getMaterial;
