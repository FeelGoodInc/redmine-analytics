import {
  useAppSelector,
  useAppDispatch,
}                              from 'hooks';
import { setMobileMenuOpened } from 'store/slices/app';
import { PROJECT_NAME }        from 'constants/global';
import cns                     from 'classnames';
import { MdMenu, MdClose }     from 'react-icons/md';
import styles                  from './cabinet-layout-header.module.scss';

export const CabinetLayoutHeader = (): JSX.Element => {
  const mobileMenuOpened = useAppSelector(({ app }) => app.mobileMenuOpened);
  const dispatch = useAppDispatch();

  return (
    <div className={styles.root}>
      <div
        className={cns(styles.action, styles.menu)}
        onClick={() => {
          dispatch(setMobileMenuOpened(!mobileMenuOpened));
        }}
      >
        {mobileMenuOpened ? <MdClose /> : <MdMenu />}
      </div>

      <div className={styles.project}>
        <div className={styles.project_name}>{PROJECT_NAME}</div>
      </div>

      <div className={styles.delimeter} />
    </div>
  );
};