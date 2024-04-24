import {useEffect, useState} from 'react';
import {useRecoilValue} from 'recoil';
import FeedbackForm from './FeedbackForm';
import FeedbackList from './FeedbackList';
import FeedbackKeywordList from './FeedbackKeywordList';
import getFeedbacks from '@/src/api/feedback/getFeedbacks';
import materialState from '@/src/recoil/atoms/materialState';
import {feedback} from '@/src/interfaces/feedback';
import '@/src/styles/variable.css';

const FeedbackContainer = () => {
  const material = useRecoilValue(materialState);
  const [reload, setReload] = useState<boolean>(false);
  const [feedbacks, setFeedbacks] = useState<feedback[]>([]);
  useEffect(() => {
    if (!material) return;
    getFeedbacks(4, parseInt(material.id), 1, 5).then(res => {
      console.log(res);
      setFeedbacks(res);
    });
  }, [reload]);

  return (
    <div className="">
      <div className="flex justify-between items-center p-4">
        <div className="text-gray-500 text-lg">Request feedback</div>
        {material ? (
          <FeedbackForm mId={parseInt(material?.id)} setReload={setReload} />
        ) : null}
      </div>
      <div className="text-center w-full feedbackContainer box-border">
        {/* 資料のFeedback */}
        {feedbacks.length === 0 ? (
          <div>
            <div className="text-4xl p-6 font-bold">
              There are no feedback currently generated.
            </div>

            <div className="text-3xl p-3 font-semibold">
              Please wait for the feedback to be generated or contact <br />{' '}
              your administrator.
            </div>
            <div className="h-20"></div>
          </div>
        ) : (
          <div>
            <div className="text-3xl p-3 font-semibold">
              Feedback on this resource
            </div>
            <div>
              <FeedbackList feedbacks={feedbacks} />
            </div>
          </div>
        )}
        <div>
          <div className="text-2xl font-semibold p-5">
            ✅ Pages most relevant to the question users were asking
          </div>
          {material ? <FeedbackKeywordList mId={material?.id} /> : null}
        </div>
      </div>
    </div>
  );
};

export default FeedbackContainer;
