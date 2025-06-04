import type { Metadata }          from 'next';
import { Inter }                  from 'next/font/google';
import NextTopLoader              from 'nextjs-toploader';
import { CustomProvider }         from 'rsuite';
import RU                         from 'rsuite/locales/ru_RU';
import { PROJECT_NAME }           from 'constants/global';
import                                 'react-toastify/dist/ReactToastify.min.css';
import                                 'styles/rsuite/styles.css';
import                                 'styles/all.scss';

const InterFont = Inter({ subsets: [ 'latin', 'cyrillic' ] });

export const metadata: Metadata = {
  title: PROJECT_NAME,
  description: '',
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
  },
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

const RootLayout = ({ children }: RootLayoutProps): JSX.Element => {

  // ----------------------------------------------------------------------
  
  return (
    <html lang="ru">
      <body className={InterFont.className}>
        <NextTopLoader />
        <CustomProvider locale={RU}>
          {children}
        </CustomProvider>
      </body>
    </html>
  );
};

export default RootLayout;