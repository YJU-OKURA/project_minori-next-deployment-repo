import {Card} from '../card';
import logos from '@/public/images/group';

const Created = () => {
  return (
    <>
      <Card
        ImageSrc={logos.seouluni}
        GroupName="Seoul University"
        GroupContent="If anyone asks you the future of your country, lift up your head and let them see the orchestra."
        FavoriteChecked={false}
      />
    </>
  );
};

export default Created;
