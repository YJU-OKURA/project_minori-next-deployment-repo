import req from '../apiUtils';

const getCheckClassSecret = async (classCode: string) => {
  const response = await req(
    `/cc/checkSecretExists?code=${classCode}`,
    'get',
    'gin'
  );

  return response.data;
};

export default getCheckClassSecret;
