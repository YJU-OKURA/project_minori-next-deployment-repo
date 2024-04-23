import BASE_URLS from '../baseUrl';

const token = localStorage.getItem('access_token');

const myHeaders = new Headers();
if (token) myHeaders.append('Authorization', token);

const requestOptions = {
  method: 'GET',
  headers: myHeaders,
};

const getFeedback = async (
  cId: number,
  mId: number,
  chat: (reader: ReadableStreamDefaultReader) => void
) => {
  try {
    const response = await fetch(
      `${BASE_URLS.nest}/class/${cId}/feedback/materials/${mId}/get-feedback`,
      requestOptions
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
