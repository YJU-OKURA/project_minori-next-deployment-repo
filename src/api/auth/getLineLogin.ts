import req from '../apiUtils';

const getLineLogin = async () => {
  const response = await req('/auth/line/login', 'get', 'gin');

  return response.data;
};

export default getLineLogin;
