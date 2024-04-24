import req from '../apiUtils';

const patchMaterial = async (
  cId: number,
  id: number,
  file: File | undefined,
  name: string | null
) => {
  const formData = new FormData();
  formData.append('name', name ? name : '');
  formData.append('file', file ? file : '');
  const response = await req(
    `/class/${cId}/materials/${id}`,
    'patch',
    'nest',
    formData
  );

  return response;
};

export default patchMaterial;
