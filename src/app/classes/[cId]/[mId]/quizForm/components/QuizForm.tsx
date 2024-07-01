'use client';
import Link from 'next/link';
import getQuizAi from '@/src/api/quiz/getQuizAi';
import {useEffect, useState} from 'react';
import {Answer, Commentary, Quiz} from '@/src/interfaces/quiz';
import QuizPrompt from './QuizPrompt';
import postQuiz from '@/src/api/quiz/postQuiz';
import {useRouter} from 'next/navigation';

const QuizForm = (props: {
  params: {cId: number; mId: number};
  searchParams: {mId: number};
}) => {
  const {params, searchParams} = props;
  const [question, setQuestion] = useState<string>('');
  const [answer, setAnswer] = useState<Answer>({a: '', b: '', c: '', d: ''});
  const [commentary, setCommentary] = useState<Commentary>({
    correctAnswer: 'A',
    content: '',
  });
  const [recommendQuiz, setRecommendQuiz] = useState<Quiz>();
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    handleImportQuiz();
  }, []);

  const handleImportQuiz = () => {
    console.log('import');
    setLoading(true);
    getQuizAi(params.cId, searchParams.mId).then(res => {
      console.log(res);
      setRecommendQuiz(res);
      setLoading(false);
    });
  };

  const handleInputQuestion = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setQuestion(e.target.value);
  };

  const handleInputAnswer = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    console.log(`Name: ${name}, Value: ${value}`);
    if (name && value) {
      setAnswer(prevAnswer => ({
        ...(prevAnswer || {a: '', b: '', c: '', d: ''}),
        [name]: value,
      }));
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    console.log(selectedValue);
    setCommentary(prevCommentary => ({
      ...(prevCommentary || {correctAnswer: '', content: ''}),
      correctAnswer: selectedValue,
    }));
  };

  const handleInputCommentary = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log(e.target.value);
    setCommentary(prevCommentary => ({
      ...(prevCommentary || {correctAnswer: 'A', content: ''}),
      content: e.target.value,
    }));
  };

  const handleAcceptQuiz = () => {
    console.log('accept');
    if (recommendQuiz) {
      setQuestion(recommendQuiz.question);
      setAnswer(recommendQuiz.answer);
      setCommentary(recommendQuiz.commentary);
    }
  };

  const handleClickSubmit = () => {
    console.log(question, answer, commentary);
    if (question && answer && commentary) {
      const data = {
        question,
        answer,
        commentary,
      };
      console.log('submit');
      postQuiz(params.cId, searchParams.mId, data).then(() => {
        router.push(`/classes/${params.cId}/${params.mId}`);
      });
    }
  };

  return (
    <div>
      <div className="flex">
        <div className="w-2/3">
          <div className="py-4">
            <div className="text-lg font-medium p-1">Question</div>
            <input
              className="w-full border-2 p-3 rounded-lg leading-8"
              placeholder="문제를 입력해주세요"
              onChange={handleInputQuestion}
              value={question}
            />
          </div>
          <div className="">
            <div className="flex justify-between items-center relative py-1">
              <div className="font-medium px-1">Answer</div>
            </div>
            <ul>
              <li className="py-2">
                <div className="w-full border-2 p-5 rounded-lg text-m">
                  <span className="pr-2">a.</span>
                  <input
                    name="a"
                    className="w-[calc(100%-25px)] outline-none"
                    placeholder="답변을 입력해주세요"
                    onChange={handleInputAnswer}
                    value={answer?.a}
                  />
                </div>
              </li>
              <li className="py-2">
                <div className="w-full border-2 p-5 rounded-lg text-m">
                  <span className="pr-2">b.</span>
                  <input
                    name="b"
                    className="w-[calc(100%-25px)] outline-none"
                    placeholder="답변을 입력해주세요"
                    onChange={handleInputAnswer}
                    value={answer?.b}
                  />
                </div>
              </li>
              <li className="py-2">
                <div className="w-full border-2 p-5 rounded-lg text-m">
                  <span className="pr-2">c.</span>
                  <input
                    name="c"
                    className="w-[calc(100%-25px)] outline-none"
                    placeholder="답변을 입력해주세요"
                    onChange={handleInputAnswer}
                    value={answer?.c}
                  />
                </div>
              </li>
              <li className="py-2">
                <div className="w-full border-2 p-5 rounded-lg text-m">
                  <span className="pr-2">d.</span>
                  <input
                    name="d"
                    className="w-[calc(100%-25px)] outline-none"
                    placeholder="답변을 입력해주세요"
                    onChange={handleInputAnswer}
                    value={answer?.d}
                  />
                </div>
              </li>
            </ul>
          </div>
          <div>
            <div className="font-medium px-1 py-2">Commentary</div>
            <div className="bg-gray-100 w-full p-5 border-2  rounded-lg leading-8 drop-shadow-md">
              <div className="font-semibold">
                Correct Answer:
                <span className="px-2">
                  <select
                    name="answer"
                    id=""
                    className=""
                    onChange={handleSelectChange}
                    value={commentary?.correctAnswer}
                  >
                    <option value="a">a</option>
                    <option value="b">b</option>
                    <option value="c">c</option>
                    <option value="d">d</option>
                  </select>
                </span>
              </div>
              <textarea
                className="font-medium bg-gray-100 pt-1 w-full outline-none resize-none"
                placeholder="해설을 입력해주세요"
                rows={5}
                onChange={handleInputCommentary}
                value={commentary?.content}
              />
            </div>
          </div>
        </div>
        <div className="w-1/3">
          <div className="w-full h-full px-4 pt-4">
            <div className="relative w-full h-full bg-gray-100">
              <div className="p-2 text-lg font-semibold">
                こんなクイズはいかがですか？
              </div>
              {!loading && recommendQuiz ? (
                <QuizPrompt props={recommendQuiz} />
              ) : (
                <div>loading...</div>
              )}
              <div className="absolute left-2 bottom-2">
                <button
                  className="p-2 bg-blue-400 text-white rounded-lg"
                  onClick={handleAcceptQuiz}
                >
                  適用する
                </button>
                <button
                  className="p-2 bg-red-400 text-white rounded-lg ml-3"
                  onClick={handleImportQuiz}
                >
                  再取得
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex py-3 px-3">
        <Link
          href={`/classes/${params.cId}/${params.mId}`}
          className="py-2 px-4 border border-black rounded-3xl"
        >
          {'< '}戻る
        </Link>
        <button
          className="py-2 px-4 ml-4 bg-blue-500 text-white rounded-3xl"
          onClick={handleClickSubmit}
        >
          セーブ
        </button>
      </div>
    </div>
  );
};

export default QuizForm;
