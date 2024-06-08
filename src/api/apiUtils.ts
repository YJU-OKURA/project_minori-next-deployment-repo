import Cookies from 'js-cookie';
import BASE_URLS from './baseUrl';
import HTTP_STATUS from './httpStatus';

async function fetchWithInterceptors(url: string, options: RequestInit) {
  let response = await fetch(url, options);

  if (response.status === HTTP_STATUS.UNAUTHORIZED) {
    const refreshToken = Cookies.get('refresh_token');
    const refreshResponse = await fetch(
      `${BASE_URLS.gin}/auth/google/refresh-token`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({refresh_token: refreshToken}),
      }
    );

    if (refreshResponse.ok) {
      const data = await refreshResponse.json();
      const newToken = data.data.access_token;
      Cookies.set('access_token', newToken);
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${newToken}`,
      };

      response = await fetch(url, options);
    } else {
      console.error('トークンの有効期限が切れました。');
      window.location.href = '/';
    }
  }

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response;
}

const req = async (
  url: string,
  method: RequestInit['method'],
  server: 'gin' | 'nest',
  body: BodyInit | object | undefined = undefined
) => {
  const headers = new Headers();
  const token = Cookies.get('access_token');
  if (token) {
    headers.append('Authorization', `Bearer ${token}`);
  }

  if (!(body instanceof FormData) && body) {
    headers.append('Content-Type', 'application/json');
    body = JSON.stringify(body);
  }

  try {
    const response = await fetchWithInterceptors(BASE_URLS[server] + url, {
      method,
      headers,
      body,
      credentials: 'include',
    });

    if (response.status === HTTP_STATUS.NO_CONTENT) {
      return {};
    }

    return response.json();
  } catch (error) {
    console.error(`${method} リクエスト中にエラーが発生しました。`, error);
    throw error;
  }
};

export default req;
