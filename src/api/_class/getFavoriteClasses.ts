import req from '@/src/api/apiUtils';

const getFavoriteClasses = async (uid: number) => {
  const response = await req(`/cu/${uid}/favorite-classes`, 'get', 'gin');

  return response;
};

export default getFavoriteClasses;
