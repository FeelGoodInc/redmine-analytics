import type { ReactNode }      from 'react';
import { redirect }            from 'next/navigation';
import { cookies }             from 'next/headers';
import { SideMenu }            from 'components/SideMenu';
import { API_KEY_COOKIE_NAME } from 'constants/global';
import styles                  from './app-layout.module.scss';

type AppLayoutProps = {
  children: ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  const apiKey = cookies().get(API_KEY_COOKIE_NAME);
  
  if (!apiKey) {
    redirect('/sign-in');
  }

  return (
    <div className={styles.root}>
      <SideMenu />

      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};
