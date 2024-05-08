import req from '@/src/api/apiUtils';

const patchClassRole = async (uid: number, cid: number, roleName: string) => {
  const response = await req(
    `/cu/${uid}/${cid}/role/${roleName}`,
    'patch',
    'gin'
  );

  return response;
};

export default patchClassRole;
