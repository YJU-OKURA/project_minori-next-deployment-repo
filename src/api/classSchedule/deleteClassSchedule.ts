import req from '../apiUtils';

const deleteClassSchedule = async (sid: number, cid: number, uid: number) => {
  const response = await req(
    `/cs/${sid}?cid=${cid}&uid=${uid}`,
    'delete',
    'gin'
  );

  return response.data;
};

export default deleteClassSchedule;
