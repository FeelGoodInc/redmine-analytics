import type{ ReactNode } from 'react';
import type { Metadata } from 'next';
import { AntdRegistry }  from '@ant-design/nextjs-registry';
import { Inter }         from 'next/font/google';
import                        'styles/all.scss';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export const metadata: Metadata = {
  title: 'Redmine Analytics',
  description: 'Simple analytics application for redmine data, requested by API',
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <AntdRegistry>{children}</AntdRegistry>
      </body>
    </html>
  );
};
