import apiUtils from '@/src/api/apiUtils';

const getClasses = async (uid: number) => {
  const response = await apiUtils(`/cu/${uid}/classes`, 'get', 'gin');

  return response;
};

export default getClasses;
