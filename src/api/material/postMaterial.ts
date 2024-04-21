import req from '../apiUtils';

const postMaterial = async (cId: number, name: string, file: File) => {
  const formData = new FormData();
  formData.append('name', name);
  formData.append('file', file);

  console.log(formData.get('name'));
  console.log(formData.get('file'));

  const response = await req(
    `/class/${cId}/materials`,
    'post',
    'nest',
    formData
  );

  return response;
};

export default postMaterial;
