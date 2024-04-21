import req from '../apiUtils';
import {PostCreateScheduleData} from '@/src/interfaces/api/_class';

const postCreateClassSchedule = async (postData: PostCreateScheduleData) => {
  const data = {
    cid: postData.cid,
    ended_at: postData.ended_at,
    is_live: postData.is_live,
    started_at: postData.started_at,
    title: postData.title,
  };

  const response = await req(`/cs?uid=${postData.uid}`, 'post', 'gin', data);

  return response;
};

export default postCreateClassSchedule;
