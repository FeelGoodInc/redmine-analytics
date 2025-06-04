'use client';
import { ToastContainer, Slide } from 'react-toastify';

type SiteLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export const SiteLayout = ({
  children,
}: SiteLayoutProps): JSX.Element => {
  return (
    <>
      <main>
        {children}
      </main>

      <ToastContainer
        position="bottom-center"
        closeButton={false}
        autoClose={11000}
        limit={5}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Slide}
        style={{ width: '90vw' }}
      />
    </>
  );
};