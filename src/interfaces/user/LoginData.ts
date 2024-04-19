import User from './User';

interface LoginData {
  access_token: string;
  refresh_token: string;
  user: User;
}

export default LoginData;
