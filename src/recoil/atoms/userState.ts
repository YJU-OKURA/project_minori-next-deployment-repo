import {atom} from 'recoil';
import {User} from '@/src/interfaces/user';
import {recoilPersist} from 'recoil-persist';

const {persistAtom} = recoilPersist();

const userState = atom<User>({
  key: 'userState',
  default: {
    id: 0,
    name: '',
    image: '',
    role_id: undefined,
  },
  effects_UNSTABLE: [persistAtom],
});

export default userState;
