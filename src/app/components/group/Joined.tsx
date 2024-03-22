// import {Favorite, Created} from '.';
import {Card} from '../card';
import {ClassProps} from '@/src/interfaces/group';

const Joined = ({classes}: ClassProps) => {
  console.log(classes);
  return (
    <>
      {classes.map(classItem => (
        <div key={classItem.id}>
          {/* バックエンドAPIの修正が終わったら、二つのComponentも追加します。 */}
          {/* <Favorite /> */} {/* <Created /> */}
          <Card
            ImageSrc={classItem.image}
            ClassName={classItem.name}
            ClassContent={classItem.description}
            FavoriteChecked={classItem.is_favorite}
          />
        </div>
      ))}
    </>
  );
};

export default Joined;
