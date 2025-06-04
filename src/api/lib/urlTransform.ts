import type { AnyObject } from 'interfaces';
import qs                 from 'qs';
import omit               from 'lodash/omit';
import merge              from 'lodash/merge';

/* eslint no-useless-escape: 0 */
const rxClean = /(\(:[^\)]+\)|:[^\/]+\/?)/g;

function cleanURLEndsWithSlash (url: string): string {
  if (url[url.length - 1] === '/') {
    return url.substring(0, url.length - 1);
  }

  return url;
}

/**
 * Url modification
 * @param  {String} url     url template
 * @param  {Object} params  params for url template
 * @param  {Object} options transformation options, accepts +delimiter+, +arrayFormat+,
 *                          +qsStringifyOptions+ and +qsParseOptions+
 * @return {String}         result url
 */
function urlTransform(
  url: string,
  params: AnyObject = {},
  options: AnyObject = {}
): string {

  if (!url) {
    return '';
  }

  const usedKeys: AnyObject = {};
  const urlWithParams = Object.keys(params).reduce((url, key) => {
    const value = params[key];
    const rx = new RegExp(`(\\(:${key}\\)|:${key})(\/?)`, 'g');

    return url.replace(rx, (_, _1, slash) => {
      usedKeys[key] = value;

      return value ? value + slash : value;
    });
  }, url);

  if (!urlWithParams) {
    return urlWithParams;
  }

  const cleanURL = urlWithParams.replace(rxClean, '');
  const usedKeysArray = Object.keys(usedKeys);

  if (usedKeysArray.length !== Object.keys(params).length) {
    const urlObject = cleanURL.split('?');
    const { arrayFormat, delimiter } = options;
    const qsParseOptions = {
      arrayFormat,
      delimiter,
      ...options.qsParseOptions,
    };

    const mergeParams = merge(
      urlObject[1] && qs.parse(urlObject[1], qsParseOptions),
      omit(params, usedKeysArray)
    );

    const qsStringifyOptions = {
      arrayFormat,
      delimiter,
      ...options.qsStringifyOptions,
    };

    const urlStringParams = qs.stringify(mergeParams, qsStringifyOptions);

    return `${cleanURLEndsWithSlash(urlObject[0])}?${urlStringParams}`;
  }

  return cleanURLEndsWithSlash(cleanURL);
}

export default urlTransform;