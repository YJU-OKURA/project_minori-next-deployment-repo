interface SubmitQuiz {
  content: {
    q_id: number;
    question: string;
  };
  result: boolean;
}

export default SubmitQuiz;
