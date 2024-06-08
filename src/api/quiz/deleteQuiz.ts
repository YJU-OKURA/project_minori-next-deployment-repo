import req from '../apiUtils';

const deleteQuiz = async (cId: number, qId: number) => {
  const response = await req(`/class/${cId}/quizzes/${qId}`, 'delete', 'nest');

  return response;
};

export default deleteQuiz;
