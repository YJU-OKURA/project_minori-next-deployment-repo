import {Card} from '../card';
import {ClassProps} from '@/src/interfaces/_class';

const CardList = ({classes}: ClassProps) => {
  return (
    <>
      {classes.map(classItem => {
        const classData = {
          ImageSrc: classItem.image,
          ClassName: classItem.name,
          ClassContent: classItem.description,
          FavoriteChecked: classItem.is_favorite,
          ClassId: classItem.id,
        };

        return (
          <div key={classItem.id}>
            <Card classData={classData} />
          </div>
        );
      })}
    </>
  );
};

export default CardList;
