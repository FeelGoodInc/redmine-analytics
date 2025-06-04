import { useEffect } from 'react';
import { getTitle }  from 'helpers';

export const useTitle = (title: string): string => {
  useEffect(() => {
    document.title = getTitle(title);
  }, [ title ]);

  return title;
};