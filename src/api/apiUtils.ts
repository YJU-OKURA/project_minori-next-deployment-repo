import axios from 'axios';
import {HttpStatus} from './httpStatus';

const BASE_URLS = {
  gin: 'http://43.203.66.25/api/gin',
  nest: 'http://3.38.86.236:3000/api/nest',
};

const api = axios.create();

const req = async (
  url: string,
  method: string,
  server: 'gin' | 'nest',
  body: object | undefined = undefined
) => {
  api.defaults.baseURL = BASE_URLS[server];
  if (server === 'nest') {
    api.defaults.headers.common['Authorization'] =
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MiwiZXhwIjoxOTY5OTAxMDIyfQ.U0k1q2oTrp3JwsIpem16o2W77tpVGiwylwc5cTFaZgU';
  }

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
    console.error(`${method} リクエスト中にエラーが発生しました.`, error);
    throw error;
  }
};

export default req;
