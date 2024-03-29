import getMessage from '@/src/api/prompts/getMessage';
import {StorageMessage} from '@/src/interfaces/prompt';
import req from '@/src/api/apiUtils';

jest.mock('@/src/api/apiUtils');

describe('getMessage function', () => {
  it('should return messages', async () => {
    const mockMessages: StorageMessage[] = [
      {
        id: '1',
        answer: 'Test answer 1',
        question: 'Test question 1',
      },
      {
        id: '2',
        answer: 'Test answer 2',
        question: 'Test question 2',
      },
    ];

    (req as jest.Mock).mockResolvedValue({
      data: {
        messages: mockMessages,
      },
    });

    const result = await getMessage(1, 1, 1, 2);
    expect(result).toEqual(mockMessages);
  });

  it('should throw an error if the request fails', async () => {
    (req as jest.Mock).mockRejectedValue(new Error('Request failed'));

    await expect(getMessage(1, 1, 1, 2)).rejects.toThrow('Request failed');
  });
});
