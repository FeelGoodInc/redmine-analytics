import isFunction              from 'lodash/isFunction';
import { getCookie }           from 'cookies-next';
import { toast }               from 'react-toastify';
import {
  API_KEY_COOKIE_NAME,
}                              from 'constants/global';

export enum HTTP_METHODS {
  'GET' = 'GET',
  'POST' = 'GET',
  'PUT' = 'GET',
  'DELETE' = 'GET',
};

type Fetcher = {
  method?: HTTP_METHODS,
  url: string,
  headers?: {
    [ name: string ]: string
  },
  body?: any
};

export const fetcher = async (
  {
    method = HTTP_METHODS.GET,
    url,
    headers = {},
    body
  }: Fetcher,
  rawResponseCallback?: (res: Response) => any
) => {
  const apiKey = getCookie(API_KEY_COOKIE_NAME);
  const isServer = typeof window === 'undefined';
  const baseUrl = !isServer ? `${window.location.origin}/api` : 'https://redmine.livingcore.ru';

  console.log(baseUrl, '/', url)

  const res = await fetch(`${baseUrl}/${url}`, {
    method,
    headers: {
      'X-Redmine-API-Key': apiKey as string,
      ...headers //some headers for current API call
    },
    redirect: 'manual',
    ...(() => body ? { body } : {})()
  })
  .then(res => {
    if (isFunction(rawResponseCallback)) {
      rawResponseCallback(res);
    }

    return res;
  })

  const contentType = res.headers.get('content-type');
  let data;

  if (contentType && contentType.includes('application/json')) {
    data = await res.json();
  } else {
    data = await res.text();
  }

  console.log(res)

  if (res.ok) {
    return data;
  } else {
    const error = new Error(res.statusText);
    
    if (typeof window !== undefined && method === 'GET') {
      switch (res.status) {
        case 403:
          toast.warning(
            '403',
            { toastId: 'requestFailed' }
          );
        break;
        default:
          toast.error(
            'При попытке получить данные произошла ошибка.',
            { toastId: 'requestFailed' }
          );
        break;
      }
    }

    throw error;
  }
};