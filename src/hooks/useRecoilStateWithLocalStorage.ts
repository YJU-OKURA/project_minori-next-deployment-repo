import {useEffect} from 'react';
import {useRecoilState} from 'recoil';
import {RecoilState} from 'recoil';
import {
  loadStateFromLocalStorage,
  saveStateToLocalStorage,
} from '@/src/recoil/atoms/userState';

const useRecoilStateWithLocalStorage = <T>(recoilState: RecoilState<T>) => {
  const [state, setState] = useRecoilState(recoilState);

  useEffect(() => {
    const storedState = loadStateFromLocalStorage(recoilState.key);
    if (storedState !== null) {
      setState(storedState);
    }
  }, [recoilState.key, setState]);

  useEffect(() => {
    saveStateToLocalStorage(recoilState.key, state);
  }, [recoilState.key, state]);

  return [state, setState] as const;
};

export default useRecoilStateWithLocalStorage;
