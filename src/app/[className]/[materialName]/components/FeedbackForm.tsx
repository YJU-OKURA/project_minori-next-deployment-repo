'use client';
import {useState} from 'react';
import getFeedback from '@/src/api/feedback/getFeedback';
import postFeedback from '@/src/api/feedback/postFeedback';

const FeedbackForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [feedback, setFeedback] = useState('');

  const handleClickFeedback = () => {
    if (feedback !== '') setFeedback('');
    getFeedback(1, 1, chat);
  };

  const handleClickSave = () => {
    postFeedback(1, 1, feedback).then(res => {
      console.log(res);
      setIsOpen(false);
    });
  };

  const chat = async (reader: ReadableStreamDefaultReader) => {
    console.log('chat 함수 실행');
    let feedbackData = '';
    try {
      while (reader) {
        const {done, value} = await reader.read();
        const decodedValue = new TextDecoder().decode(value);
        feedbackData += decodedValue;
        console.log(feedbackData);
        setFeedback(promptRes => promptRes + decodedValue);

        if (feedback.includes(' ')) {
          feedbackData = '';
        }
        if (done) {
          break;
        }
      }
    } catch (error) {
      console.error('스트림 읽기 중 오류가 발생했습니다:', error);
    } finally {
      reader.releaseLock();
    }
  };

  return (
    <div>
      <div
        className="border-2 border-gray-600 rounded-full w-12 h-12 flex justify-center items-center text-2xl"
        onClick={() => setIsOpen(true)}
      >
        +
      </div>
      {isOpen ? (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
          <div
            className=" bg-white rounded-lg w-[750px] h-[550px] py-6 box-border flex justify-center items-center"
            id="modal-container"
          >
            <div className="w-[550px] h-full text-center box-border">
              <div className="text-4xl font-semibold pt-4">
                The Assistant’s Analysis
              </div>
              <div className="text-sm text-neutral-400 my-2">
                Collaborate with your team to get the most out of monday.com
              </div>
              <div className="w-full m-auto flex text-left py-2">
                <div className="w-1/2 flex items-center">
                  <select name="" id="" className="border p-2 rounded-lg">
                    <option value="">All Feedback</option>
                    <option value="">Partial feedback</option>
                  </select>
                  <div className="px-2">
                    <button
                      className="px-3 py-1 rounded-lg bg-gray-200"
                      onClick={handleClickFeedback}
                    >
                      {feedback === '' ? 'Load' : 'Reload'}
                    </button>
                  </div>
                </div>
              </div>
              <div className="py-3">
                <div className="w-full h-[260px] rounded-md p-4 bg-gray-100 overflow-scroll">
                  {feedback.replace(/AI|"/g, '')}
                </div>
              </div>
              <div className="w-2/3 m-auto flex justify-between">
                <button
                  className="border border-gray-500 rounded-full px-6 py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {'< '}Close
                </button>
                <button
                  className="bg-blue-500 text-white rounded-full px-6 py-2"
                  onClick={handleClickSave}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default FeedbackForm;
