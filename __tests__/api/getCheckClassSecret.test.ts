import req from '@/src/api/apiUtils';

const getCheckClassSecret = async (classCode: string) => {
  const response = await req(
    `/cc/checkSecretExists?code=${classCode}`,
    'get',
    'gin'
  );

  return response;
};

describe('getCheckClassSecret', () => {
  it('should return HttpStatus.OK', async () => {
    const classCode1 = 'class1';

    const response1 = await getCheckClassSecret(classCode1);

    expect(response1.data).toStrictEqual({secretExists: false});
  });

  it('should return HttpStatus.NOT_FOUND', async () => {
    const classCode2 = 'class3';

    await expect(getCheckClassSecret(classCode2)).rejects.toThrow(
      'Request failed with status code 404'
    );
  });
});
