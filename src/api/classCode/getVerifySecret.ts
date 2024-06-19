import req from '../apiUtils';

const getVerifySecret = async (
  classCode: string,
  secret: string,
  uid: number
) => {
  const response = await req(
    `/cc/verifyAndRequestAccess?code=${classCode}${
      secret ? `&secret=${secret}` : ''
    }&uid=${uid}`,
    'get',
    'gin'
  );

  return response.data;
};

export default getVerifySecret;
