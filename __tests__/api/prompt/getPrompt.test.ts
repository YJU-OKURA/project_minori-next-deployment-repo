import getPrompt from '@/src/api/prompts/getPrompt';
import req from '@/src/api/apiUtils';

jest.mock('@/src/api/apiUtils');

describe('getPrompt', () => {
  it('should call the correct endpoint and return data', async () => {
    const mockData = {message: 'test'};
    (req as jest.Mock).mockResolvedValue({data: mockData});

    const result = await getPrompt(1, 2, 3, 4);

    expect(req).toHaveBeenCalledWith(
      '/class/1/prompts/2?page=3&limit=4',
      'get',
      'nest'
    );
    expect(result).toEqual(mockData);
  });
});
