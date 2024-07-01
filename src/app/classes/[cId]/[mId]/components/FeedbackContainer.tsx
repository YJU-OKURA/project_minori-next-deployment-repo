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
        <div className="text-gray-500 text-lg">フィードバックリクエスト</div>
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
              まだフィードバックはありません。
            </div>

            <div className="text-3xl p-3 font-semibold">
              フィードバックが生成されるまで待ったり <br />{' '}
              管理者にお問い合わせください。
            </div>
            <div className="h-20"></div>
          </div>
        ) : (
          <div>
            <div className="text-3xl p-3 font-semibold">
              この資料へのフィードバック
            </div>
            <div>
              <FeedbackList feedbacks={feedbacks} />
            </div>
          </div>
        )}
        <div>
          <div className="text-2xl font-semibold p-5">
            ✅ ユーザーが質問した内容と最も関連性の高いページ
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
