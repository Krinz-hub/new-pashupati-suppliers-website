import React from 'react';
import { BrowserRouter, useRoutes, useLocation } from 'react-router-dom';
import { routes } from './routes';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { MobileContactBar } from '../components/layout/MobileContactBar';
import { ScrollToTop } from '../components/layout/ScrollToTop';
import { AuthProvider } from '../context/AuthContext';

const AppLayout: React.FC = () => {
  const element = useRoutes(routes);
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  if (isAdminRoute) {
    return <div className="min-h-screen bg-slate-900">{element}</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 pb-14 md:pb-0">{element}</div>
      <Footer />
      <MobileContactBar />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ScrollToTop />
        <AppLayout />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
