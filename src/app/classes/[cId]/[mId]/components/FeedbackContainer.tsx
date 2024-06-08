import {useEffect, useState} from 'react';
import {useRecoilValue} from 'recoil';
import FeedbackForm from './FeedbackForm';
import FeedbackList from './FeedbackList';
import FeedbackKeywordList from './FeedbackKeywordList';
import getFeedbacks from '@/src/api/feedback/getFeedbacks';
import materialState from '@/src/recoil/atoms/materialState';
import {feedback} from '@/src/interfaces/feedback';
import '@/src/styles/variable.css';

const FeedbackContainer = (props: {cId: number}) => {
  const material = useRecoilValue(materialState);
  const [reload, setReload] = useState<boolean>(false);
  const [feedbacks, setFeedbacks] = useState<feedback[]>([]);
  useEffect(() => {
    if (!material) return;
    getFeedbacks(props.cId, parseInt(material.id), 1, 5).then(res => {
      console.log(res);
      setFeedbacks(res);
    });
  }, [reload]);

  return (
    <div className="">
      <div className="flex justify-between items-center p-4">
        <div className="text-gray-500 text-lg">피드백 요청</div>
        {material ? (
          <FeedbackForm
            cId={props.cId}
            mId={parseInt(material?.id)}
            setReload={setReload}
          />
        ) : null}
      </div>
      <div className="text-center w-full feedbackContainer box-border">
        {/* 資料のFeedback */}
        {feedbacks.length === 0 ? (
          <div>
            <div className="text-4xl p-6 font-bold">
              아직 피드백이 없습니다.
            </div>

            <div className="text-3xl p-3 font-semibold">
              피드백이 생성될 때까지 기다리거나 <br /> 관리자에게 문의하세요.
            </div>
            <div className="h-20"></div>
          </div>
        ) : (
          <div>
            <div className="text-3xl p-3 font-semibold">
              이 자료에 대한 피드백
            </div>
            <div>
              <FeedbackList feedbacks={feedbacks} />
            </div>
          </div>
        )}
        <div>
          <div className="text-2xl font-semibold p-5">
            ✅ 사용자가 질문한 내용과 가장 관련성이 높은 페이지
          </div>
          {material ? (
            <FeedbackKeywordList cId={props.cId} mId={parseInt(material?.id)} />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default FeedbackContainer;
