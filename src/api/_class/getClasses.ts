import req from '@/src/api/apiUtils';

const getClasses = async (uid: number) => {
  const response = await req(`/cu/${uid}/classes`, 'get', 'gin');

  return response;
};

export default getClasses;
