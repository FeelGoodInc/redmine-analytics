'use client';
import type { SideMenuState, SideMenuStatePatch } from './index';
import { useEffect, useState, useRef }            from 'react';
import { useAppSelector }                         from 'hooks';
import { SideMenuHeader }                         from './Header';
import { SideMenuProfile }                        from './Profile';
import {
  SideMenuCommonSection,
}                                                 from './Sections';
import { SideMenuContext, initialState }          from './context';
import { setCookie, getSideMenuStateFromCookie }  from 'helpers/cookies';
import { SIDE_MENU_STATE_COOKIE_NAME }            from 'constants/global';
import debounce                                   from 'lodash/debounce';
import cns                                        from 'classnames';
import styles                                     from './side-menu.module.scss';

export const SideMenu = (): JSX.Element => {
  const [ state, setState ] = useState<SideMenuState>(initialState);
  const scroll = useRef<HTMLDivElement>(null);
  const menuOpened = useAppSelector(({ app }) => app.menuOpened);

  // ---------------------------------------------------------------------

  useEffect(() => {
    setState(getSideMenuStateFromCookie());
  }, []);

  // ---------------------------------------------------------------------

  useEffect(() => {
    if (scroll.current) {
      scroll.current.scrollTop = state.scrollPosition;
    }

    setCookie(SIDE_MENU_STATE_COOKIE_NAME, JSON.stringify(state));
  }, [ state ]);

  // ---------------------------------------------------------------------

  const updateState = (patch: SideMenuStatePatch): void => {
    setState({ ...state, ...patch });
  };

  // ---------------------------------------------------------------------

  const onScroll = (): void => {
    if (scroll.current) {
      const { scrollTop } = scroll.current;

      updateState({ scrollPosition: scrollTop });
    }
  };

  // ---------------------------------------------------------------------

  return (
    <div
      className={cns(styles.root, {
        [styles.menu_hide]: !menuOpened,
      })}
    >
      <SideMenuContext.Provider
        value={{
          query: state.query || '',
          expanded: state.expanded,
          updateState,
        }}
      >
        <SideMenuHeader />
        <SideMenuProfile />

        <div className={styles.sections_wrapper}>
          <div
            ref={scroll}
            className={styles.sections}
            onScroll={debounce(onScroll, 100)}
          >
            <SideMenuCommonSection />
          </div>
        </div>
      </SideMenuContext.Provider>
    </div>
  );
};