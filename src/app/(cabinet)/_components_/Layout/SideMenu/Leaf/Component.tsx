'use client';
import {
  type ReactNode,
  type MouseEvent,
}                                     from 'react';
import { useGetRawPathname }          from 'hooks';
import { useAppDispatch }             from 'hooks';
import Link                           from 'next/link';
import { setMobileMenuOpened }        from 'store/slices/app';
import isUndefined                    from 'lodash/isUndefined';
import cns                            from 'classnames';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';
import styles                         from './side-menu-leaf.module.scss';

type SideMenuLeafProps = {
  icon: JSX.Element;
  text: string;
  route?: string;
  displayCount?: string | number;
  displayCountTitle?: string;
  disabled?: boolean;
  children?: ReactNode;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
}

export const SideMenuLeaf = ({
  icon,
  text = '',
  route,
  displayCount,
  displayCountTitle,
  disabled = false,
  children,
  onClick = (): void => {},
}: SideMenuLeafProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const pathname = useGetRawPathname();
  const isActive = pathname.includes(route as string);
  const isExpanded = children && isActive;

  // -----------------------------------------------------------

  const getContent = (): JSX.Element => (
    <div
      className={cns(styles.content, {
        [styles.active]: isActive,
        [styles.disabled]: disabled,
      })}
      onClick={onClick}
    >
      <div className={styles.tree_line}>
        <div className={styles.tree_line_vertical} />
        <div className={styles.tree_line_horizontal} />
      </div>

      <div className={styles.icon}>{icon}</div>
      <div className={styles.text}>{text}</div>

      {children && (
        <div className={styles.arrow}>
          { isExpanded ? <MdExpandLess /> : <MdExpandMore /> }
        </div>
      )}
      
      {!isUndefined(displayCount) && (
        <div
          className={styles.display_count}
          title={displayCountTitle}
        >
          {displayCount}
        </div>
      )}
    </div>
  );

  // -----------------------------------------------------------

  const getLeafHeader = (): JSX.Element => {
    if (!isUndefined(route)) {
      return (
        <Link href={route}>
          {getContent()}
        </Link>
      );
    }

    return getContent();
  };

  // -----------------------------------------------------------

  return (
    <div
      className={styles.root}
      onClick={() => { dispatch(setMobileMenuOpened(false)) }}
    >
      {disabled && <div className={styles.disabled} />}
      {getLeafHeader()}

      {(children && isExpanded) && (
        <div className={styles.submenu}>
          {children}
        </div>
      )}
    </div>
  );
};