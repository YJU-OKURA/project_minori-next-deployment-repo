import req from '../apiUtils';
import {LoginData} from '@/src/interfaces/user';

const postGoogleLogin = async (code: string): Promise<LoginData> => {
  const body = {
    authCode: code,
  };

  const response = await req('/auth/google/process', 'post', 'gin', body);

  return response.data;
};

export default postGoogleLogin;
