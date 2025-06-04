import { RESOURCES } from './endpoints/main';
import { API_URL }   from 'constants/global';

type Resources = typeof RESOURCES;
type ResourcesNames = keyof Resources;

type APIReturn = {
  [Key in ResourcesNames]: ReturnType<Resources[Key]>;
};

export const MAIN_API_PREFIX = '/backend';

const API = (): APIReturn => {
  const resources = {} as APIReturn;
  const getBaseURL = (): string => typeof window === 'undefined' ? API_URL : MAIN_API_PREFIX;

  for (const name of Object.keys(RESOURCES)) {
    resources[name] = RESOURCES[name]({ getBaseURL, name });
  }

  return resources;
};

export default API();