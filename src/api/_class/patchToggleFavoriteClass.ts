import req from '@/src/api/apiUtils';

const patchToggleFavoriteClass = async (uid: number, cid: number) => {
  const response = await req(
    `/cu/${uid}/${cid}/toggle-favorite`,
    'patch',
    'gin'
  );

  return response;
};

export default patchToggleFavoriteClass;
