import req from '../apiUtils';

const getGoogleLogin = async () => {
  const response = await req('auth/google/login', 'get', 'gin');

  return response.data;
};

export default getGoogleLogin;
