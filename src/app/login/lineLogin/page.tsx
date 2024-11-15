'use client';
import {useEffect} from 'react';
import {useRouter} from 'next/navigation';
import Cookies from 'js-cookie';
import {useSetRecoilState} from 'recoil';
import userState from '@/src/recoil/atoms/userState';
import postLogin from '@/src/api/auth/postLogin';

export const dynamic = 'force-dynamic'; // 이 페이지는 클라이언트 측에서만 렌더링됨

const Page = () => {
  const setUser = useSetRecoilState(userState);
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    console.log('code : ', code);

    if (code) {
      postLogin(code, 'line').then(res => {
        console.log('res : ', res);
        if (res.user) {
          setUser(res.user);
        }
        if (res) {
          Cookies.set('access_token', res.access_token);
          Cookies.set('refresh_token', res.refresh_token);
        }
        router.push('/classes');
      });
    }
  }, [router, setUser]);

  return <div></div>;
};

export default Page;
