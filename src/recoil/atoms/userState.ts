import {atom} from 'recoil';
import {User} from '@/src/interfaces/user';

const userState = atom<User | null>({
  key: 'userState',
  default: null,
});

const saveStateToLocalStorage = (key: string, value: unknown) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const loadStateFromLocalStorage = (key: string) => {
  const storedState = localStorage.getItem(key);
  return storedState ? JSON.parse(storedState) : null;
};

export {userState, saveStateToLocalStorage, loadStateFromLocalStorage};
