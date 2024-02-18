'use client';

import { useEffect } from 'react';
import { issuesAPI } from 'api';

export const HomeView = (): JSX.Element => {
  useEffect(() => {
    console.log('render')
    issuesAPI.get();
  }, []);

  return <>HomeView</>
};
