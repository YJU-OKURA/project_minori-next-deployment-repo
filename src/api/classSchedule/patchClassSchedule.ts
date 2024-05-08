import req from '../apiUtils';
import {PutClassScheduleData} from '@/src/interfaces/api/_class';

const patchClassSchedule = async (requestData: PutClassScheduleData) => {
  const requestForm = {
    ended_at: requestData.ended_at,
    is_live: requestData.is_live,
    started_at: requestData.started_at,
    title: requestData.title,
  };
  const response = await req(
    `/cs/${requestData.sid}?cid=${requestData.cid}&uid=${requestData.uid}`,
    'patch',
    'gin',
    JSON.stringify(requestForm)
  );

  return response;
};

export default patchClassSchedule;
