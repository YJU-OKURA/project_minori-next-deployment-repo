import Image from 'next/image';
import {UserProps} from '@/src/interfaces/navbar';
import icons from '@/public/svgs/navbar';

const Profile = (props: UserProps) => {
  return (
    <div className="w-full h-12 flex items-start justify-between box-content ">
      <div className="flex items-center">
        <Image
          src={props.imgUrl}
          width={10}
          height={10}
          alt="userImage"
          className="w-8 h-8 rounded-lg"
        />
        <div className="mx-2">{props.name}</div>
      </div>
      <button className="w-8 h-8 rounded-lg float-end">
        <Image src={icons.moreVert} alt="icon" width={30} height={30}></Image>
      </button>
    </div>
  );
};

export default Profile;
