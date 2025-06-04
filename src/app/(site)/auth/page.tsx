import type { FC }       from 'react';
import type { Metadata } from 'next';
import { AuthView }      from './_view_';
import { getTitle }      from 'helpers';

const title = 'Авторизация';

export const metadata: Metadata = {
  title: getTitle(title),
};

const SignInPage: FC = () => {
  return (
    <AuthView />
  );
};

export default SignInPage;
