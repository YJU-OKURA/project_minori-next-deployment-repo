import req from '../apiUtils';

const getClassUsers = async (cid: number, role: string) => {
  const response = await req(
    `/cu/class/${cid}/members?role=${role}`,
    'get',
    'gin'
  );

  return response.data;
};

export default getClassUsers;
