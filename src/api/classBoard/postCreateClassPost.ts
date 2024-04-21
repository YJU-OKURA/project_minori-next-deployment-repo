import req from '../apiUtils';
import {PostBoardData} from '@/src/interfaces/api/_class';

const postCreateClassPost = async (postData: PostBoardData) => {
  const formData = new FormData();
  formData.append('title', postData.title);
  formData.append('content', postData.content);
  formData.append('cid', postData.cid.toString());
  formData.append('uid', postData.uid.toString());
  formData.append('is_announced', postData.is_announced.toString());

  if (postData.image) {
    formData.append('image', postData.image);
  }

  const response = await req('/cb', 'post', 'gin', formData);

  return response;
};

export default postCreateClassPost;
