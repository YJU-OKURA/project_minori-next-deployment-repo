import req from '@/src/api/apiUtils';

const verifySecret = async (classCode: string, secret: string, uid: number) => {
  const response = await req(
    `/cc/verifyClassCode?code=${classCode}&secret=${secret}&uid=${uid}`,
    'get',
    'gin'
  );

  return response;
};

describe('getCheckClassSecret', () => {
  it('should return HttpStatus.OK', async () => {
    const classCode1 = 'class1';
    const secret1 = '';
    const uid1 = 1;

    const response1 = await verifySecret(classCode1, secret1, uid1);

    expect(response1.data).toStrictEqual({
      message: 'クラスコードの確認と役割の割り当て',
    });
  });

  it('should return HttpStatus.OK', async () => {
    const classCode2 = 'class2';
    const secret2 = 'class2';
    const uid2 = 2;

    const response2 = await verifySecret(classCode2, secret2, uid2);

    expect(response2.data).toStrictEqual({
      message: 'クラスコードの確認と役割の割り当て',
    });
  });
});
