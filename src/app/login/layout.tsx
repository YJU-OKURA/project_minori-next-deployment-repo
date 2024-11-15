import gifs from '@/public/gif';
import Image from 'next/image';

const ClassesLayout = ({children}: {children: React.ReactNode}) => {
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
          {children}
        </div>
      </div>
    </div>
  );
};

export default ClassesLayout;
