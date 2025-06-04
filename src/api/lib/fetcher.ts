import isEmpty          from 'lodash/isEmpty';
import isFunction       from 'lodash/isFunction';
import { toast }        from 'react-toastify';
import {
  AUTH_PAGE_URL,
  RESET_CREDENTIALS_URL,
  TOKEN_COOKIE_NAME,
}                       from 'constants/global';
import { eraseCookie }  from 'helpers/cookies';
import { RequestError } from './error';

export type Fetcher = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  url: string;
  headers?: {
    [ name: string ]: string;
  };
  body?: any;
};

export type Pagination = {
  page?: number;
  pageCount?: number;
  perPage?: number;
  totalCount?: number;
};

// --------------------------------------------------------------------------

const PAGINATION_HEADERS_MAP: Record<string, string> = {
  'x-pagination-current-page': 'page',
  'x-pagination-page-count': 'pageCount',
  'x-pagination-per-page': 'perPage',
  'x-pagination-total-count': 'totalCount',
};

const DEFAULT_ERROR_MESSAGE = 'При попытке получить данные произошла ошибка.';
const DEFAULT_SUPPORT_MESSAGE = 'Пожалуйста, обратитесь в техподдержку.';
const DEFAULT_MESSAGE = `${DEFAULT_ERROR_MESSAGE} ${DEFAULT_SUPPORT_MESSAGE}`;

// --------------------------------------------------------------------------

const fetcher = async (
  {
    method = 'GET',
    url,
    headers = {},
    body,
  }: Fetcher,
  rawResponseCallback?: (res: Response) => any
): Promise<any> => {

  // --------------------------------------------------------

  const res = await fetch(url, {
    method,
    headers: {
      //some default headers here (for future)
      ...headers, //some headers for current API call
    },
    credentials: 'include',
    redirect: 'manual',
    ...(body ? { body } : {}),
  })
  .then(res => {
    if (res.type === 'opaqueredirect') {
      document.location = RESET_CREDENTIALS_URL;
    }

    if (isFunction(rawResponseCallback)) {
      rawResponseCallback(res);
    }

    return res;
  });

  const contentType = res.headers.get('content-type');
  let data;

  if ((contentType || '').includes('application/json')) {
    data = await res.json();
  } else {
    data = await res.text();
  }

  if (res.ok) {
    const paginationHeaders = Object.keys(PAGINATION_HEADERS_MAP);
    const pagination: Pagination = paginationHeaders.reduce(
      (result, name) => {
        const _result = { ...result };
        const value = res.headers.get(name);
    
        if (value) {
          _result[PAGINATION_HEADERS_MAP[name] as keyof Pagination] = +value;
        }
    
        return _result;
      },
      {} as Pagination
    );

    return isEmpty(pagination) ? data : { data, pagination };
  }

  const error = new RequestError(res.statusText, {
    response: res,
    data,
    status: res.status,
    method,
  });
    
  if (typeof window !== 'undefined' && method === 'GET') {
    const { status } = res;

    switch (true) {
      case status === 401:
        eraseCookie(TOKEN_COOKIE_NAME);
        document.location = AUTH_PAGE_URL;
        break;
      case (status !== 422 && (status > 401 || status < 500)):
        toast.error(DEFAULT_MESSAGE);
        break;
      default:
        toast.error(DEFAULT_MESSAGE);
        break;
    }
  }

  throw error;
};

export default fetcher;