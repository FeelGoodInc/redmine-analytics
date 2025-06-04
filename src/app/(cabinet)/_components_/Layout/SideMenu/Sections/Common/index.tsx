'use client';

import { SideMenuSection } from './../../Section';
import { SideMenuLeaf }    from './../../Leaf';
import {
  FaChartPie,
}                          from 'react-icons/fa6';

export const SideMenuCommonSection = (): JSX.Element => {
  return (
    <SideMenuSection>
      <SideMenuLeaf
        icon={<FaChartPie  />}
        route="/main"
        text="Статистика"
      />
    </SideMenuSection>
  );
};