import {Card} from '../card';
import logos from '@/public/images/_class';

const Favorite = () => {
  return (
    <>
      <Card
        ImageSrc={logos.yeungjin}
        ClassName="YeungJin University"
        ClassContent="This is YeungJin University Group blablablabla"
        FavoriteChecked={true}
      />
    </>
  );
};

export default Favorite;
