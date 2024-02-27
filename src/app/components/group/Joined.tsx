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
        GroupName={'TwayAir'}
        GroupContent={'Safe way, Tway'}
        FavoriteChecked={false}
      />
      <Card
        ImageSrc={logos.yahoo}
        GroupName={'Yahoo Japan'}
        GroupContent={'To the most convenient country in the world'}
        FavoriteChecked={false}
      />
    </>
  );
};

export default Joined;
