import axios from 'axios';
import BASE_URLS from './baseUrl';
import HTTP_STATUS from './httpStatus';

const api = axios.create();

api.interceptors.request.use(async config => {
  const token = localStorage.getItem('access_token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const originalRequest = error.config;
    // トークンの有効期限が切れていて、トークン更新要求がない場合
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const body = {
        refresh_token: localStorage.getItem('refresh_token'),
      };
      try {
        const res = await axios.post(
          `${BASE_URLS.gin}/auth/google/refresh-token`,
          body
        );
        if (res.status === 200) {
          const newToken = res.data.data.access_token;
          localStorage.setItem('access_token', newToken);
          api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
          // トークンが更新された後、元のリクエストを再実行
          return api(originalRequest);
        }
      } catch (error) {
        console.error('トークンの有効期限が切れました。');
        window.location.href = '/intro';
      }
    }
    return Promise.reject(error);
  }
);

const req = async (
  url: string,
  method: string,
  server: 'gin' | 'nest',
  body: object | undefined = undefined
) => {
  api.defaults.baseURL = BASE_URLS[server];

  if (typeof body !== 'undefined') {
    if (body instanceof FormData) {
      api.defaults.headers.common['Content-Type'] = 'multipart/form-data';
    } else if (typeof body !== 'undefined') {
      api.defaults.headers.common['Content-Type'] = 'application/json';
    }
  }
  try {
    const response = await api.request({
      url,
      method,
      data: body,
      withCredentials: true,
    });
    if (response.status === HTTP_STATUS.NO_CONTENT) {
      return {};
    }
    return response.data;
  } catch (error) {
    console.error(`${method} リクエスト中にエラーが発生しました.`, error);
    throw error;
  }
};

export default req;
