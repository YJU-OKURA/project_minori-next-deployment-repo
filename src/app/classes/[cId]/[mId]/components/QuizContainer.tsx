import {useRecoilValue} from 'recoil';
import QuizList from './QuizList';
import materialState from '@/src/recoil/atoms/materialState';

const QuizContainer = (props: {cId: number}) => {
  const material = useRecoilValue(materialState);

  return (
    <div className="py-4">
      {material ? (
        <QuizList
          cId={props.cId}
          mId={parseInt(material?.id)}
          mName={material?.name}
        />
      ) : null}
    </div>
  );
};

export default QuizContainer;
