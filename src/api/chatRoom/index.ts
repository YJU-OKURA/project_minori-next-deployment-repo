import getLiveMessages from './getLiveMessages';
import getMessages from './getMessages';
import postMessage from './postMessage';
import URLList from './URLList';

const chatRoomAPI = {
  getMessages,
  postMessage,
  getLiveMessages,
  URLList,
};

export default chatRoomAPI;
