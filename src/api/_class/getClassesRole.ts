import req from '@/src/api/apiUtils';

const getClassesRole = async (uid: number, roleID: number) => {
  const response = await req(`/cu/${uid}/classes/${roleID}`, 'get', 'gin');

  return response;
};

export default getClassesRole;
