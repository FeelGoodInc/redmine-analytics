import fetcher                           from 'api/lib/fetcher';
import useSWR, {
  type SWRResponse,
  SWRConfiguration,
}                                        from 'swr';
import isFunction                        from 'lodash/isFunction';

const useGet = <T = any, >(
  url: string | (() => string),
  options?: SWRConfiguration
): SWRResponse<T> => {
  const fetcherUrl = isFunction(url) ? url() : url;

  return useSWR(url, () => fetcher({ url: fetcherUrl }), options);
};

export default useGet;