'use client';
import {useEffect} from 'react';
import Image from 'next/image';
import {useRouter, useSearchParams} from 'next/navigation';
import Cookies from 'js-cookie';
import {useSetRecoilState} from 'recoil';
import userState from '@/src/recoil/atoms/userState';
import postGoogleLogin from '@/src/api/auth/postGoogleLogin';
import gifs from '@/public/gif';
import '@/src/styles/variable.css';

const Page = () => {
  const code: string | null = useSearchParams().get('code');
  const setUser = useSetRecoilState(userState);
  const router = useRouter();
  useEffect(() => {
    if (code) {
      postGoogleLogin(code).then(res => {
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
  }, []);

  return (
    <div className="absolute top-0 opacity-50 w-full h-[100vh] flex justify-center items-center bg-[#8c8c8c]">
      <div className="w-[650px] h-[500px] bg-white drop-shadow-xl rounded-lg flex justify-center items-center">
        <div className="text-xl text-gray-400">
          <Image
            src={gifs.eclipse}
            alt="loading"
            width={70}
            height={70}
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
