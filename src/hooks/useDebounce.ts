import {useState, useEffect} from 'react';

const useDebounce = (value: string, delay: number) => {
  const [debounceVal, setDebounce] = useState<string>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounce(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debounceVal;
};

export default useDebounce;
