import {Card} from '../card';
import logos from '@/public/images/group';

const Waiting = () => {
  return (
    <Card
      ImageSrc={logos.wasedauni}
      GroupName={'Waseda University'}
      GroupContent={'Independence of Learning'}
      FavoriteChecked={false}
    />
  );
};

export default Waiting;
