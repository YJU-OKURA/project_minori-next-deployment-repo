'use client';
import {ReactNode, useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {useRecoilValue} from 'recoil';
import userState from '@/src/recoil/atoms/userState';

const Protect = ({children}: {children: ReactNode}) => {
  const user = useRecoilValue(userState);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/intro');
    }
  }, [user, router]);

  return children;
};

export default Protect;
