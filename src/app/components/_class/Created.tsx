import {Card} from '../card';
import logos from '@/public/images/_class';

const Created = () => {
  return (
    <>
      <Card
        ImageSrc={logos.seouluni}
        ClassName="Seoul University"
        ClassContent="If anyone asks you the future of your country, lift up your head and let them see the orchestra."
        FavoriteChecked={false}
      />
    </>
  );
};

export default Created;
