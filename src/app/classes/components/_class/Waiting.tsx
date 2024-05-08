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
            현재 신청 중인 클래스가 존재하지 않습니다
          </p>
        </div>
      )}
    </>
  );
};

export default Waiting;
