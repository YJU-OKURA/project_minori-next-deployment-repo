import req from '../apiUtils';

const deleteMaterial = async (cId: number, id: number) => {
  const response = await req(`/class/${cId}/materials/${id}`, 'delete', 'nest');

  return response;
};

export default deleteMaterial;
