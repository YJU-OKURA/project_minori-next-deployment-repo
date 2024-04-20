import {atom} from 'recoil';
import {AccessToken} from '@/src/interfaces/user';

const accessTokenState = atom<AccessToken>({
  key: 'accessTokenState',
  default: {
    access_token: '',
  },
});

export default accessTokenState;
