'use client';
import type { AnyObject }      from 'interfaces';
import {
  type ReactNode,
  useEffect,
  useState,
}                              from 'react';
import { type ResourcesNames } from 'api/endpoints/main';
import {
  useAppDispatch,
  useAppSelector,
}                              from 'hooks';
import { fetchResourceThunk }  from 'store/slices/cachedResources';
import pick                    from 'lodash/pick';
import isNull                  from 'lodash/isNull';
import isEmpty                 from 'lodash/isEmpty';

export type WithCachedResourcesProps = {
  resources: Partial<Record<ResourcesNames, {
    query?: AnyObject;
  }>>;
  children: ReactNode;
};

type RequiredResourcesStats = {
  exists: ResourcesNames[];
  needToFetch: ResourcesNames[];
}

export const WithCachedResources = ({
  resources,
  children,
}: WithCachedResourcesProps): ReactNode => {
  const [ isBlocked, setIsBlocked ] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const cachedResources = useAppSelector((state) => state.cachedResources);

  // ----------------------------------------------------------------------

  const getRequiredResourcesStats = (): RequiredResourcesStats => {
    const extractedResources = pick(cachedResources, Object.keys(resources));
    const result = { exists: [], needToFetch: [] };

    for (const resourceName in extractedResources) {
      if (isNull(extractedResources[resourceName].data)) {
        result.needToFetch.push(resourceName);
      } else {
        result.exists.push(resourceName);
      }
    }

    return result;
  };

  // ----------------------------------------------------------------------

  const { needToFetch } = getRequiredResourcesStats();

  useEffect(() => {
    if (!isEmpty(needToFetch)) {
      setIsBlocked(true);

      Promise.all(needToFetch.map(resourceName => {
        const resourceConfig = resources[resourceName];
        const resourceQuery = resourceConfig.query;

        return (
          dispatch(fetchResourceThunk({
            resourceName,
            ...(resourceQuery ? { query: resourceQuery } : {}),
          }))
        );
      }))
      .finally(() => {
        setIsBlocked(false);
      });
    } else {
      setIsBlocked(false);
    }
  }, []);

  const renderCondition = !isBlocked && isEmpty(needToFetch);

  // ----------------------------------------------------------------------

  return renderCondition && children;
};