import {
  type ReactNode,
}                               from 'react';
import {
  useAppSelector,
}                               from 'hooks';
import { WithCachedResources }  from 'components/WithCachedResources';
import { CabinetLayoutHeader }  from './Header';
import { SideMenu }             from './SideMenu';
import cns                      from 'classnames';
import styles                   from './cabinet-layout.module.scss';

type CabinetLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

const CabinetLayoutWCR = ({ children }: CabinetLayoutProps): ReactNode => {
  const mobileMenuOpened = useAppSelector(({ app }) => app.mobileMenuOpened);
  const menuOpened = useAppSelector(({ app }) => app.menuOpened);
  const renderCondition = true;

  // ------------------------------------------------------------------------

  return (
    <>
      {renderCondition && (
        <main className={styles.root}>
          <div className={styles.header}>
            <CabinetLayoutHeader />
          </div>

          <div
            className={cns(styles.menu, {
              [styles.mobile_menu_opened]: mobileMenuOpened,
            })}
          >
            <SideMenu />
          </div>
          
          <div
            className={cns(styles.content, {
              [styles.menu_hide]: !menuOpened,
            })}
          >
            {children}
          </div>
        </main>
      )}
    </>
  );
};

export const CabinetLayout = ({ children }: CabinetLayoutProps): ReactNode => (
  <WithCachedResources
    resources={{
      users: { query: { status: 1, limit: 100, sort: 'lastname:asc' } },
      groups: { query: { limit: 100, sort: 'name:asc' } },
    }}
  >
    <CabinetLayoutWCR>
      {children}
    </CabinetLayoutWCR>
  </WithCachedResources>
);