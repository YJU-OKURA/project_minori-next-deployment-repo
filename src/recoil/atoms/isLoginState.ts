import {atom} from 'recoil';

const isLogInState = atom<boolean>({
  key: 'isLoggedInState',
  default: false,
});

export default isLogInState;
