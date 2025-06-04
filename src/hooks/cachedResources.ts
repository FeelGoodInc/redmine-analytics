import { type ResourcesNames } from 'api/endpoints/main';
import { useAppSelector }      from 'hooks';
import pick                    from 'lodash/pick';

export const useGetCachedResources = <T = any, >(
  resources: ResourcesNames[],
): T => {
  const cachedResources = useAppSelector((state) => state.cachedResources);
  const requiredResources = pick(cachedResources, resources);

  return resources.reduce((acc, cur) => {
    return {
      ...acc,
      [cur]: requiredResources[cur].data,
    };
  }, {} as T);
};