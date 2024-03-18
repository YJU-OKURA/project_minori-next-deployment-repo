import req from '@/src/api/apiUtils';
import getMaterial from '@/src/api/material/getMaterial';

jest.mock('@/src/api/apiUtils');

describe('getMaterial', () => {
  it('should fetch materials successfully', async () => {
    const classId = 1;
    const pageNumber = 1;
    const limitNumber = 10;
    const materials = [
      {id: 1, name: 'Material 1'},
      {id: 2, name: 'Material 2'},
    ];

    const response = {
      data: materials,
    };
    // Jestの模擬(mock)関数の生成
    const reqMock = jest.fn().mockResolvedValue(response);

    // req関数を模擬(mock)関数で置き換え
    (req as jest.Mock).mockImplementation(reqMock);

    // 模擬関数の戻り値を設定するとき
    reqMock.mockResolvedValue(response);

    const result = await getMaterial(classId, pageNumber, limitNumber);

    expect(req).toHaveBeenCalledWith(
      `/class/${classId}/materials?page=${pageNumber}&limit=${limitNumber}`,
      'get',
      'nest'
    );

    expect(result).toEqual(materials);
  });

  it('should handle error when fetching materials', async () => {
    const classId = 1;
    const pageNumber = 1;
    const limitNumber = 10;
    const error = new Error('Failed to fetch materials');

    (req as jest.Mock).mockRejectedValue(error);

    await expect(getMaterial(classId, pageNumber, limitNumber)).rejects.toThrow(
      error
    );
  });
});
