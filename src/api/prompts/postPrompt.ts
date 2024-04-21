const postPrompt = async (
  cId: number,
  id: number,
  message: string,
  chat: (reader: ReadableStreamDefaultReader) => void
) => {
  const body = {
    message: message,
  };
  try {
    const response = await fetch(
      `http://3.38.86.236:3000/api/nest/class/${cId}/prompts/${id}`,
      {
        method: 'POST',
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MiwiZXhwIjoxOTY5OTAxMDIyfQ.U0k1q2oTrp3JwsIpem16o2W77tpVGiwylwc5cTFaZgU',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body), // 요청 본문을 JSON 문자열로 변환
      }
    );
    console.log('res:', response);
    const reader = response.body?.getReader();
    if (!reader) {
      console.error('응답 스트림이 없습니다.');
      return;
    }
    console.log(chat);
    await chat(reader); // chat 함수에 reader를 전달합니다.
  } catch (error) {
    console.error('스트림 처리 중 오류가 발생했습니다:', error);
  }
};

// async function chat(
//   reader: ReadableStreamDefaultReader
//   // callback: (feedback: string) => void
// ) {
//   console.log('chat 함수 실행');
//   let feedback = '';
//   try {
//     while (reader) {
//       const {done, value} = await reader.read();
//       const decodedValue = new TextDecoder().decode(value);
//       feedback += decodedValue;

//       if (feedback.includes(' ')) {
//         console.log(feedback);
//         // callback(feedback);
//         feedback = '';
//       }
//       if (done) {
//         // console.log('스트림이 완료되었습니다.');
//         // console.log(feedback);
//         break;
//       }
//     }
//   } catch (error) {
//     console.error('스트림 읽기 중 오류가 발생했습니다:', error);
//   } finally {
//     reader.releaseLock();
//     // callback(feedback);
//   }
// }

export default postPrompt;
