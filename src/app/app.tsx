import { FC } from 'react';
import { Outlet } from '@tanstack/react-router';
import { Header, Footer } from '../components';

export const App: FC = () => (
  <>
    <Header />
    <Outlet />
    <Footer />
  </>
);
