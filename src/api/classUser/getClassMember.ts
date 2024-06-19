import req from '../apiUtils';

const getClassMember = async (cid: number) => {
  const response = await req(
    `/cu/class/${cid}/members?role=USER`,
    'get',
    'gin'
  );

  return response.data;
};

export default getClassMember;
