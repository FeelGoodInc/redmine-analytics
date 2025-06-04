'use client';
import { useState, useMemo }     from 'react';
import { useRouter }             from 'hooks';
import useOnClickOutside         from 'react-cool-onclickoutside';
import { SideMenuLeaf }          from './../Leaf';
import { RESET_CREDENTIALS_URL } from 'constants/global';
import { minidenticon }          from 'minidenticons';
import {
  MdLogout,
  MdExpandMore,
  MdExpandLess,
}                                from 'react-icons/md';
import styles                    from './side-menu-profile.module.scss';

export const SideMenuProfile = (): JSX.Element => {
  const router = useRouter();
  const [ open, setOpen ] = useState<boolean>(false);
  const ref = useOnClickOutside(() => { setOpen(false) });

  // -----------------------------------------------------------------

  const logout = (): void => {
    router.replace(RESET_CREDENTIALS_URL);
  };

  // -----------------------------------------------------------------

  const getAvatar = (): JSX.Element => {
    const avatarString = encodeURIComponent(minidenticon('123' as string, 0));
    const svgURI = `data:image/svg+xml;utf8,${avatarString}`;

    return (
      <img src={svgURI} />
    );
  };

  const avatar = useMemo(() => getAvatar(), [ '123' ]);

  // -----------------------------------------------------------------

  return (
    <div
      className={styles.root}
      ref={ref}
    >
      <div
        className={styles.top}
        onClick={() => { setOpen(!open) }}
      >
        <div className={styles.avatar}>
          {avatar}
        </div>

        <div className={styles.user}>
          <div className={styles.user_name}>
            123
          </div>
          <div className={styles.user_email}>
            244
          </div>
        </div>
        <div className={styles.arrow}>
          { open ? <MdExpandLess /> : <MdExpandMore /> }
        </div>
      </div>

      {open && (
        <div className={styles.menu}>
          <div className={styles.menu_item}>
            <SideMenuLeaf
              icon={<MdLogout />}
              text="Выйти из системы"
              onClick={() => {
                setOpen(false);
                logout();
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};