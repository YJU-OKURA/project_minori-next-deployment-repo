import {Card} from '../card';
import {ClassProps} from '@/src/interfaces/_class';

const CardList = ({classes}: ClassProps) => {
  return (
    <>
      {classes.map((classItem, index) => {
        const classData = {
          ImageSrc: classItem.image,
          ClassName: classItem.name,
          ClassContent: classItem.description,
          FavoriteChecked: classItem.is_favorite,
          ClassId: classItem.id,
        };

        return (
          <div key={index}>
            {classes.length === 0 ? (
              <p>가입된 클래스가 존재하지 않습니다</p>
            ) : (
              <div key={classItem.id}>
                <Card classData={classData} />
              </div>
            )}
          </div>
        );
      })}
    </>
  );
};

export default CardList;
