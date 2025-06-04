import type {
  SideMenuState,
  SideMenuStatePatch,
}                                    from './index';
import { createContext, useContext } from 'react';

export const initialState: SideMenuState = {
  query: '',
  scrollPosition: 0,
  expanded: {
    'administration': true,
    'danger-zone': true,
  },
};

export type SideMenuContext = {
  query: string;
  expanded: SideMenuState['expanded'];
  updateState: (patch: SideMenuStatePatch) => void;
};

export const SideMenuContext = createContext<SideMenuContext>({
  query: '',
  expanded: initialState.expanded,
  updateState: () => {},
} as SideMenuContext);

export const useSideMenuContext = (): SideMenuContext => useContext(SideMenuContext);
