import postPrompt from '@/src/api/prompts/postPrompt';
import req from '@/src/api/apiUtils';

jest.mock('@/src/api/apiUtils');

describe('postPrompt', () => {
  it('should call the correct endpoint with the correct body and return response', async () => {
    const mockResponse = {status: 200};
    (req as jest.Mock).mockResolvedValue(mockResponse);

    const message = 'test message';
    const result = await postPrompt(1, 2, message);

    expect(req).toHaveBeenCalledWith('/class/1/prompts/2', 'post', 'nest', {
      message,
    });
    expect(result).toEqual(mockResponse);
  });
});
