import {atom} from 'recoil';
import {Material} from '@/src/interfaces/navbar';
import {recoilPersist} from 'recoil-persist';

const {persistAtom} = recoilPersist();

const materialState = atom<Material | null>({
  key: 'materialState',
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export default materialState;
