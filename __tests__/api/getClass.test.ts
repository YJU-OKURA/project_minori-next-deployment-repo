import req from '@/src/api/apiUtils';
import getClass from '@/src/api/_class/getClasses';

jest.mock('@/src/api/apiUtils');
describe('getClass', () => {
  it('should fetch classBoard successfully', async () => {
    const userId = 1;
    const classes = [
      {
        id: 1,
        name: 'class(1)',
        limitation: 10,
        description: 'class(1) description',
        image: 'image',
        is_favorite: false,
      },
      {
        id: 2,
        name: 'class(2)',
        limitation: 30,
        description: 'class(2) description',
        image: '',
        is_favorite: false,
      },
    ];

    const response = {
      data: classes,
    };
    // Jestの模擬(mock)関数の生成
    const reqMock = jest.fn().mockResolvedValue(response);

    // req関数を模擬(mock)関数で置き換え
    (req as jest.Mock).mockImplementation(reqMock);

    // 模擬関数の戻り値を設定するとき
    reqMock.mockResolvedValue(response);

    const result = await getClass(userId);

    expect(req).toHaveBeenCalledWith(`/cu/${userId}/classes`, 'get', 'gin');

    expect(result.data).toEqual(response.data);
  });

  it('should handle error when fetching classBoards', async () => {
    const userId = 1;
    const error = new Error('Failed to fetch classBoards');

    (req as jest.Mock).mockRejectedValue(error);

    await expect(getClass(userId)).rejects.toThrow(error);
  });
});
