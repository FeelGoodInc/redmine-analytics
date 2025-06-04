import type { Metadata } from 'next';
import type { FC }       from 'react';
import { getTitle }      from 'helpers';
import { DashboardView } from './_view_';

const title = 'Главная';

export const metadata: Metadata = {
  title: getTitle(title),
};

const DashboardPage: FC = () => {
  return (
    <DashboardView title={title} />
  );
};

export default DashboardPage;
