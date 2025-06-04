'use client';
import type { ReactNode }        from 'react';
import { SideMenuSections }      from 'app/(cabinet)/_components_/Layout/SideMenu';
import { useSideMenuContext }    from './../context';
import {
  MdKeyboardArrowUp,
  MdKeyboardArrowDown,
}                                from 'react-icons/md';
import styles                    from './side-menu-section.module.scss';

type SideMenuSectionProps = {
  id?: keyof typeof SideMenuSections;
  title?: string;
  children: ReactNode;
  expanded?: boolean;
};

export const SideMenuSection = ({
  id,
  title,
  expanded = true,
  children,
}: SideMenuSectionProps): JSX.Element => {
  const { expanded: expandedSections, updateState } = useSideMenuContext();

  return (
    <div className={styles.root}>
      {!!title && (
        <div
          className={styles.title}
          onClick={() => {
            updateState({ expanded: { ...expandedSections, [id]: !expanded } });
          }}
        >
          <div className={styles.text}>
            {title}
          </div>
          <div className={styles.arrow}>
            {expanded ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
          </div>
        </div>
      )}

      {expanded && (
        <div className={styles.content}>
          {children}
        </div>
      )}
    </div>
  );
};