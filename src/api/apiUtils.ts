import axios from 'axios';
import {HttpStatus} from './httpStatus';

const BASE_URL = 'http://43.203.66.25/api/gin';
// const BASE_URL = 'http://3.38.86.236:3000/api/nest';

const api = axios.create({
  baseURL: BASE_URL,
});

const req = async (
  url: string,
  method: string,
  body: object | undefined = undefined
) => {
  if (typeof body !== 'undefined') {
    api.defaults.headers.common['Content-Type'] = 'application/json';
  }
  try {
    const response = await api.request({
      url,
      method,
      data: body,
    });

    if (response.status === HttpStatus.NO_CONTENT) {
      return response.data;
    }

    return response.data;
  } catch (error) {
    console.error(`${method} リクエスト中にエラーが発生しました:`, error);
    throw error;
  }
};

export default req;
