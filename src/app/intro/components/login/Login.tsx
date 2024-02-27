import Image from 'next/image';
import {ModalProps} from '@/src/interfaces/intro';
import login from '@/public/images/login';
import svgs from '@/public/svgs/login';

const Login = ({onClose}: ModalProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className=" bg-white rounded-lg w-1/2 h-3/5 py-10 box-border">
        <div className="w-full h-full flex items-center box-border">
          {/* LEFT */}
          <div className="w-3/5 text-center">
            <div className="text-3xl font-semibold">Welcome to Minori</div>
            <div className="text-sm text-neutral-400 my-2">
              Get started - it free. No credit card needed.
            </div>
            <Image
              src={svgs.login}
              alt="logo"
              width={450}
              height={450}
              className="m-auto mb-0"
            />
          </div>
          {/* RIGHT */}
          <div className="w-2/5">
            <div className="w-4/5 text-sm">
              <Image
                src={login.logo}
                alt="logo"
                width={250}
                height={250}
                className="m-auto w-4/5 "
              />
              <div className="my-5">
                <button className="block m-auto border-2 w-full flex items-center justify-between px-10 py-2 m-auto my-3">
                  <Image
                    src={svgs.google}
                    alt="google"
                    width={15}
                    height={15}
                  />
                  <div className="ml-2 text-center w-full">
                    Continue with Google
                  </div>
                </button>
                <button className="block m-auto border-2 w-full flex items-center justify-between px-10 py-2 m-auto my-3">
                  <Image src={svgs.yahoo} alt="google" width={15} height={15} />
                  <div className="ml-2 text-center w-full">
                    Continue with Yahoo
                  </div>
                </button>
                <button className="block m-auto border-2 w-full flex items-center justify-between px-10 py-2 m-auto my-3">
                  <Image src={svgs.line} alt="google" width={15} height={15} />
                  <div className="ml-2 text-center w-full">
                    Continue with Line
                  </div>
                </button>
              </div>
              <div className="w-1/5"></div>
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default Login;
