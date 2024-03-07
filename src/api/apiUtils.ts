import axios from 'axios';
import {HttpStatus} from './httpStatus';

const BASE_URL = 'http://43.203.66.25/api/gin';
// const BASE_URL = 'http://15.165.15.156:3000/api/nest';

const api = axios.create({
  baseURL: BASE_URL,
});

export const req = async <T>(
  url: string,
  method: string,
  body: object | undefined = undefined
): Promise<T> => {
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

    return response.data as T;
  } catch (error) {
    console.error(`${method} 요청 중 에러가 발생했습니다:`, error);
    throw error;
  }
};
