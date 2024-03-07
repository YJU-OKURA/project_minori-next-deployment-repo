import {Favorite, Created} from '.';
import {Card} from '../card';
import logos from '@/public/images/group';

const Joined = () => {
  return (
    <>
      <Favorite />
      <Created />
      <Card
        ImageSrc={logos.twayair}
        ClassName={'TwayAir'}
        ClassContent={'Safe way, Tway'}
        FavoriteChecked={false}
      />
      <Card
        ImageSrc={logos.yahoo}
        ClassName={'Yahoo Japan'}
        ClassContent={'To the most convenient country in the world'}
        FavoriteChecked={false}
      />
    </>
  );
};

export default Joined;
