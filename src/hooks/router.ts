'use client';
import type {
  AppRouterInstance,
  NavigateOptions,
}                                     from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter as useNextRouter } from 'nextjs-toploader/app';
import { useParams, usePathname }     from 'next/navigation';
import isObject                       from 'lodash/isObject';
import isNull                         from 'lodash/isNull';

export const useGetRawPathname = (): string => {
  const params = useParams();
  const pathname = usePathname();
  const splittedRoute = pathname.split('/');

  if (isObject(params) && !isNull(params)) {
    let reconstructedPath = '';

    for (let i = 1; i < splittedRoute.length; i++) {
      const segment = splittedRoute[i];
      // Check if the segment matches any value in the params object
      const matchingKey = Object.keys(params).find(key => params[key] === segment);
    
      if (matchingKey) {
        // Replace the segment with the dynamic segment
        reconstructedPath += `/[${matchingKey}]`;
      } else {
        // Keep the original segment
        reconstructedPath += `/${segment}`;
      }
    }
    
    return reconstructedPath;
  }

  return pathname;
};

// -----------------------------------------------------------
// -----------------------------------------------------------

type RouteParams = {
  pathname: string;
  query: Record<string, any>;
} | string;

export const useRouter = (): AppRouterInstance => {
  const {
    push: nextPush,
    replace: nextReplace,
    ...rest
  } = useNextRouter();

  // -----------------------------------------------------------

  const getRoute = (params: RouteParams): string => {
    if (isObject(params)) {
      const { pathname, query } = params;
      const generateQuery = new URLSearchParams(query).toString();

      return `${pathname}?${generateQuery}`;
    }

    return params;
  };

  // -----------------------------------------------------------

  const customPush = (params: RouteParams): void => {
    nextPush(getRoute(params));
  };

  // -----------------------------------------------------------

  const customReplace = (params: RouteParams, options: NavigateOptions = {}): void => {
    nextReplace(getRoute(params), options);
  };

  // -----------------------------------------------------------

  return {
    ...rest,
    push: customPush,
    replace: customReplace,
  };
};