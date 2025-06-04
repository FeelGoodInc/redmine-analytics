import type { AnyObject }        from 'interfaces';
import fetcher                   from './fetcher';
import urlTransform              from './urlTransform';

interface ResourceProps {
  getBaseURL?: () => string;
  name?: string;
  url: string;
}

type QsStringifyOptions = {
  // indices 'a[0]=b&a[1]=c'
  // brackets 'a[]=b&a[]=c'
  // repeat 'a=b&a=c'
  // comma 'a=b,c'
  arrayFormat?: 'indices' | 'brackets' | 'repeat' | 'comma';
};

export interface IResource<T> {
  getUrl: (params?: AnyObject, qsStringifyOptions?: QsStringifyOptions) => string;
  get: (
    params?: AnyObject,
    rawResClb?: (res: Response) => T,
    qsStringifyOptions?: QsStringifyOptions
  ) => Promise<T>;
}

export type ResourceFnParams = {
  getBaseURL: () => string;
  name: string;
}

type TGetURL = (params?: AnyObject, qsStringifyOptions?: QsStringifyOptions) => string;
type TUpdate<T> = (data: T, forcedURL?: string, payload?: AnyObject) => Promise<T>;
type TCreate<T> = (data: T, forcedURL?: string, rawResClb?: (res: Response) => any) => Promise<T>;

export interface IResourceCreate<T> {
  getUrl: TGetURL;
  create: (
    params: T | T[],
    forcedURL?: string,
    rawResClb?: (res: Response) => T
  ) => Promise<T>;
}

export interface IResourceUpdate<T> {
  getUrl: TGetURL;
  update: (
    params: AnyObject,
    forcedURL?: string,
    payload?: AnyObject
  ) => Promise<T>;
}

export interface IResourceCRUD<T> extends IResource<T>{
  create: (
    params: T | T[],
    forcedURL?: string,
    rawResClb?: (res: Response) => T
  ) => Promise<T>;
  update: (
    params: AnyObject,
    forcedURL?: string,
    payload?: AnyObject
  ) => Promise<T>;
  delete: (id: number | string) => Promise<void>;
}

const makeCreateFunction = <T>(resourceEntity: IResourceCreate<T>): TCreate<T> => {
  return async <T>(data: T, forcedURL?: string, rawResClb?: (res: Response) => any): Promise<T> => await fetcher(
    {
      method: 'POST',
      url: forcedURL || resourceEntity.getUrl(),
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    },
    rawResClb
  );
};

const makeGetUrlFunction = ({ url, getBaseURL }: ResourceProps): TGetURL => {
  return (
    params: AnyObject = {},
    qsStringifyOptions: QsStringifyOptions = { arrayFormat: 'comma' }
  ): string => {
    const restAPIUrl = urlTransform(
      url,
      params,
      { qsStringifyOptions }
    );

    return `${getBaseURL()}/${restAPIUrl}`;
  };
};

const makeUpdateFunction = <T>(resourceEntity: IResourceUpdate<T>): TUpdate<T> => {
  return async (data: T, forcedURL?: any, payload?: AnyObject) => {
    const url = resourceEntity.getUrl(data).split('?')[0];
    const _payload = payload || data;

    return await fetcher({
      method: 'PUT',
      url: forcedURL || url,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(_payload),
    });
  };
};

export class Resource<T> implements IResource<T> {
  protected getBaseURL;
  protected name;
  protected url;
  public getUrl;

  constructor ({ getBaseURL, name, url }: ResourceProps) {
    this.getBaseURL = getBaseURL;
    this.name = name;
    this.url = url;
    this.getUrl = makeGetUrlFunction({ url: this.url, getBaseURL: this.getBaseURL });
  }

  get = async (params?: AnyObject, rawResClb?: any, qsStringifyOptions?: AnyObject): Promise<T> => {
    return await fetcher({ url: this.getUrl(params, qsStringifyOptions) }, rawResClb);
  };
}

export class ResourceCRUD<T> extends Resource<T> implements IResourceCRUD<T> {
  constructor (props: ResourceProps) {
    super(props);
  }
  getUrl = makeGetUrlFunction({ url: this.url, getBaseURL: this.getBaseURL });

  create = makeCreateFunction<T>(this);

  update = makeUpdateFunction<T>(this);

  delete = async (id: number | string): Promise<void> => await fetcher({
    method: 'DELETE',
    url: this.getUrl({ id }),
  });
}

export class ResourceUpdate<T> extends Resource<T> implements IResourceUpdate<T> {
  constructor (props: ResourceProps) {
    super(props);
  }
  
  getUrl = makeGetUrlFunction({ url: this.url, getBaseURL: this.getBaseURL });

  update = makeUpdateFunction<T>(this);
}

export class ResourceCreate<T> extends Resource<T> implements IResourceCreate<T> {
  constructor (props: ResourceProps) {
    super(props);
  }

  getUrl = makeGetUrlFunction({ url: this.url, getBaseURL: this.getBaseURL });

  create = makeCreateFunction<T>(this);
}

type CrudParams ={
  url: string;
}

type CrudResourceReturnType<T> = (params: ResourceFnParams) => IResourceCRUD<T>;
type ResourceReturnType<T> = (params: ResourceFnParams) => IResource<T>;
type ResourceCreateReturnType<T> = (params: ResourceFnParams) => IResourceCreate<T>;
type ResourceUpdateReturnType<T> = (params: ResourceFnParams) => IResourceUpdate<T>;

export const getResourceCrudEntity = <T>({ url }: CrudParams): CrudResourceReturnType<T> => {
  return (params: ResourceFnParams): ResourceCRUD<T> => {
    return new ResourceCRUD<T>({ url, ...params });
  };
};

export const getResourceEntity = <T>({ url }: CrudParams): ResourceReturnType<T> => {
  return (params: ResourceFnParams): Resource<T> => {
    return new Resource<T>({ url, ...params });
  };
};

export const getResourceCreateEntity = <T>({ url }: CrudParams): ResourceCreateReturnType<T> => {
  return (params: ResourceFnParams): ResourceCreate<T> => {
    return new ResourceCreate<T>({ url, ...params });
  };
};

export const getResourceUpdateEntity = <T>({ url }: CrudParams): ResourceUpdateReturnType<T> => {
  return (params: ResourceFnParams): ResourceUpdate<T> => {
    return new ResourceUpdate<T>({ url, ...params });
  };
};
