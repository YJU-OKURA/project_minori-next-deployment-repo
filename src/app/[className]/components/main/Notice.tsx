import Image from 'next/image';
import icons from '@/public/svgs/_class';
import {RoleProps} from '@/src/interfaces/_class';

const Notice = ({managerRole}: RoleProps) => {
  return (
    <div className="flex items-center border rounded-lg mt-2 ps-2 h-14">
      <Image
        className="mx-2"
        src={icons.notice}
        alt={'noticeIcon'}
        width={24}
        height={24}
      />
      <div className="flex w-full justify-between">
        <p className="font-semibold text-lg">Professor : Hi</p>
        {managerRole && (
          <Image
            className="me-5"
            src={icons.moreVert}
            alt={'moreVert'}
            width={30}
            height={30}
          />
        )}
      </div>
    </div>
  );
};

export default Notice;
