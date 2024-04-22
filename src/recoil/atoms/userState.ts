import {atom} from 'recoil';
import {User} from '@/src/interfaces/user';
import {recoilPersist} from 'recoil-persist';

const {persistAtom} = recoilPersist();

const userState = atom<User | null>({
  key: 'userState',
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export default userState;
