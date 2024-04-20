import {atom} from 'recoil';
import {RefreshToken} from '@/src/interfaces/user';

const refreshTokenState = atom<RefreshToken>({
  key: 'refreshTokenState',
  default: {
    refresh_token: '',
  },
});

export default refreshTokenState;
