import req from '../apiUtils';

const putUserName = async (uId: number, cId: number, name: string) => {
  const body = {
    new_name: name,
  };
  const response = await req(`/cu/${uId}/${cId}/rename`, 'put', 'gin', body);

  return response;
};

export default putUserName;
