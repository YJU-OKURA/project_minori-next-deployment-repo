import {Card} from '../card';
import {ClassProps} from '@/src/interfaces/_class';

const CardList = ({classes}: ClassProps) => {
  return (
    <>
      {classes.length === 0 ? (
        <p className="text-center text-2xl font-bold text-gray-900">
          현재 가입된 클래스가 존재하지 않습니다
        </p>
      ) : (
        classes.map((classItem, index) => {
          const classData = {
            ImageSrc: classItem.image,
            ClassName: classItem.name,
            ClassContent: classItem.description,
            FavoriteChecked: classItem.is_favorite,
            ClassId: classItem.id,
          };

          return (
            <div key={index}>
              <Card classData={classData} />
            </div>
          );
        })
      )}
    </>
  );
};

export default CardList;
