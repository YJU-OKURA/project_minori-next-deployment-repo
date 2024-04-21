import req from '../apiUtils';

const patchMaterial = async (cId: number, id: number) => {
  const response = await req(`/class/${cId}/materials/${id}`, 'patch', 'nest');

  console.log(response);

  return response;
};

export default patchMaterial;
