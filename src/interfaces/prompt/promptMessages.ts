interface PromptMessages {
  id: string;
  messages: {
    id: string;
    answer: string;
    is_save: boolean;
    question: string;
  }[];
}

export default PromptMessages;
