const postPrompt = async (
  cId: number,
  id: number,
  message: string,
  chat: (reader: ReadableStreamDefaultReader) => void
) => {
  const token = localStorage.getItem('access_token');
  console.log('token:', token);
  const body = {
    message: message,
  };
  console.log('body:', body);
  try {
    const response = await fetch(
      `http://3.38.86.236:3000/api/nest/class/${cId}/prompts/${id}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
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

export default postPrompt;
