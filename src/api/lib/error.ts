import type { AnyObject } from 'interfaces';

export interface RequestErrorProperties<T = AnyObject> {
  response: Response;
  data: T;
  status: number;
  method: string;
}

export class RequestError extends Error {
  protected response: RequestErrorProperties['response'];
  protected data: RequestErrorProperties['data'];
  protected status: RequestErrorProperties['status'];
  protected method: RequestErrorProperties['method'];

  constructor(message: string, properties: RequestErrorProperties) {
    super(message);
    this.name = 'RequestError';
    this.response = properties.response;
    this.data = properties.data;
    this.status = properties.status;
    this.method = properties.method;
  }
}