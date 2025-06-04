import { format } from 'date-fns';

const NODE_ENV = process.env.NODE_ENV;

export const log = (value: string, what?: string): void => {
  if (NODE_ENV === 'development') {
    /* eslint-disable no-console */
    console.log('---------------------------------------------');
    console.log(`[${format(new Date(), 'dd.MM.yyyy HH:mm:ss')}]`, what || '');
    console.log(value);
    console.log('---------------------------------------------');
  }
};
