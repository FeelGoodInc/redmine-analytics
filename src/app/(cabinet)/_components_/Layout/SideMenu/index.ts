export enum SideMenuSections {
  'administration',
  'danger-zone',
}

export type SideMenuState = {
  query: string;
  scrollPosition: number;
  expanded: {
    [key in keyof typeof SideMenuSections]: boolean
  };
};

export type SideMenuStatePatch = {
  [key in keyof SideMenuState]?: SideMenuState[key]
};

export * from './Component';