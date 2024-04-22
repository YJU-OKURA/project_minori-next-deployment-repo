const myHeaders = new Headers();
myHeaders.append(
  'Authorization',
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MiwiZXhwIjoxOTY5OTAxMDIyfQ.U0k1q2oTrp3JwsIpem16o2W77tpVGiwylwc5cTFaZgU'
);

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
      `http://3.38.86.236:3000/api/nest/class/${cId}/feedback/materials/${mId}/get-feedback`,
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
