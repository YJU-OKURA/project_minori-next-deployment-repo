import BASE_URLS from '../baseUrl';

const getFeedback = async (
  cId: number,
  mId: number,
  type: string,
  chat: (reader: ReadableStreamDefaultReader) => void
) => {
  const token = localStorage.getItem('access_token');
  try {
    const response = await fetch(
      `${BASE_URLS.nest}/class/${cId}/feedback/materials/${mId}/get-feedback?type=${type}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log('res:', response);
    const reader = response.body?.getReader();
    if (!reader) {
      console.error('応答ストリームがありません。');
      return;
    }
    await chat(reader);
  } catch (error) {
    console.error('ストリーム処理中にエラーが発生しました:', error);
  }
};

export default getFeedback;
