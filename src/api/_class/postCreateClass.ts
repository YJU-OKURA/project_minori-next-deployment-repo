import req from '../apiUtils';
import {PostCreateClassData} from '@/src/interfaces/api/_class';

const postCreateClass = async (postData: PostCreateClassData) => {
  const formData = new FormData();
  formData.append('name', postData.name);
  formData.append('limitation', postData.limitation.toString());
  formData.append('description', postData.description);
  formData.append('uid', postData.userId.toString());
  if (postData.image) {
    formData.append('image', postData.image);
  }

  const response = await req('/cl/create', 'post', 'gin', formData);

  return response;
};

export default postCreateClass;
