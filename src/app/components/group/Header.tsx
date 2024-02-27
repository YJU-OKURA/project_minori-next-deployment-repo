import Image from 'next/image';
import icons from '@/public/svgs/group';

const Header = () => {
  return (
    <div className="mt-6">
      <div className="flex items-center justify-between me-10">
        <h1 className="text-black text-5xl font-medium">Groups</h1>
        <Image src={icons.folder} width={70} height={70} alt={'folder'} />
      </div>
      <div className="border border-gray-200 w-11/12 mt-4"></div>
    </div>
  );
};

export default Header;
