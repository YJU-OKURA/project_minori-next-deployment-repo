import {ClassWait} from './modal';
import {ClassProps} from '@/src/interfaces/_class';

const Waiting = ({classes}: ClassProps) => {
  return (
    <>
      {classes && classes.length > 0 ? (
        classes.map(classItem => (
          <div key={classItem.id}>
            <ClassWait ImageSrc={classItem.image} ClassName={classItem.name} />
          </div>
        ))
      ) : (
        <div>
          <p className="text-center text-2xl font-bold text-gray-900">
            現在申請中のクラスが存在しません
          </p>
        </div>
      )}
    </>
  );
};

export default Waiting;
