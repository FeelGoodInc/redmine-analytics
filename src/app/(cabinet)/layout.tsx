'use client';
import { Provider }      from 'react-redux';
import store             from 'store';
import { CabinetLayout } from './_components_/Layout';
import {
  ToastContainer,
  Slide,
}                        from 'react-toastify';

type LayoutProps = Readonly<{
  children: React.ReactNode;
}>;

const Layout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <Provider store={store}>
      <CabinetLayout>
        {children}
      </CabinetLayout>

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
    </Provider>
  );
};

export default Layout;