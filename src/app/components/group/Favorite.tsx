import {Card} from '../card';
import logos from '@/public/images/group';

const Favorite = () => {
  return (
    <>
      <Card
        ImageSrc={logos.yeungjin}
        GroupName="YeungJin University"
        GroupContent="This is YeungJin University Group blablablabla"
        FavoriteChecked={true}
      />
    </>
  );
};

export default Favorite;
