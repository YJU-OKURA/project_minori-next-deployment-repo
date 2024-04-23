import {atom} from 'recoil';
import {ClassUser} from '@/src/interfaces/user';
import {recoilPersist} from 'recoil-persist';

const {persistAtom} = recoilPersist();

const classUserState = atom<ClassUser | null>({
  key: 'classUserState',
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export default classUserState;
