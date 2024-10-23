import Cookies from 'js-cookie';

const postPrompt = async (
  cId: number,
  id: number,
  message: string,
  chat: (reader: ReadableStreamDefaultReader) => void
) => {
  const token = Cookies.get('access_token');
  const body = {
    message: message,
  };
  try {
    const response = await fetch(
      `http://localhost:8080/api/nest/class/${cId}/prompts/${id}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );
    console.log('res:', response);
    const reader = response.body?.getReader();
    // 応答ストリームがない場合
    if (!reader) {
      console.error('応答ストリームがありません。');
      return;
    }

    chat(reader);
  } catch (error) {
    console.error('ストリーム処理中にエラーが発生しました:', error);
  }
};

export default postPrompt;
