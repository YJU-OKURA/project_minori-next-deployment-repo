import req from '@/src/api/apiUtils';

const getClassesRole = async (uid: number, roleID: string) => {
  const response = await req(`/cu/${uid}/classes?role=${roleID}`, 'get', 'gin');

  return response;
};

export default getClassesRole;
