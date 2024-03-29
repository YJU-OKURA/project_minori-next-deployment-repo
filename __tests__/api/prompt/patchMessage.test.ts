import patchMessage from '@/src/api/prompts/patchMessage';
import req from '@/src/api/apiUtils';

jest.mock('@/src/api/apiUtils');

describe('patchMessage', () => {
  it('should call the correct endpoint and return response', async () => {
    const mockResponse = {status: 200};
    (req as jest.Mock).mockResolvedValue(mockResponse);

    const result = await patchMessage(1, 2, 3, true);

    expect(req).toHaveBeenCalledWith(
      '/class/1/prompts/2/messages/3?is_save=true',
      'patch',
      'nest'
    );
    expect(result).toEqual(mockResponse);
  });
});
