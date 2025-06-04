'use client';
import { SiteLayout } from './_components_/Layout';

type LayoutProps = Readonly<{
  children: React.ReactNode;
}>;

const Layout = ({
  children,
}: LayoutProps): JSX.Element => {
  return (
    <SiteLayout>
      {children}
    </SiteLayout>
  );
};

export default Layout;