import req from '../apiUtils';

const deleteFeedback = async (cId: number, mId: number) => {
  const response = await req(
    `/class/${cId}/feedback/materials/${mId}`,
    'delete',
    'nest'
  );

  console.log(response);
};

export default deleteFeedback;
