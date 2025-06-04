'use client';
import { type ReactNode }        from 'react';
import Link                      from 'next/link';
import Image                     from 'next/image';
import {
  PROJECT_NAME,
  HOME_PAGE_URL,
  APP_VERSION,
}                                from 'constants/global';
import styles                    from './side-menu-header.module.scss';

export const SideMenuHeader = (): ReactNode => {
  return (
    <div className={styles.root}>
      <Link
        href={HOME_PAGE_URL}
        className={styles.logo}
      >
        <div className={styles.logo_image}>
          <Image
            src="/logo.png"
            width={46}
            height={27}
            alt={PROJECT_NAME}
          />
        </div>
        <div className={styles.logo_text}>
          <div className={styles.project_name}>{PROJECT_NAME}</div>
          <div className={styles.project_version}>
            {APP_VERSION}
          </div>
        </div>
      </Link>
    </div>
  );
};