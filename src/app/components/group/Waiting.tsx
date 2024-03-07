import {Card} from '../card';
import logos from '@/public/images/group';

const Waiting = () => {
  return (
    <Card
      ImageSrc={logos.wasedauni}
      ClassName={'Waseda University'}
      ClassContent={'Independence of Learning'}
      FavoriteChecked={false}
    />
  );
};

export default Waiting;
