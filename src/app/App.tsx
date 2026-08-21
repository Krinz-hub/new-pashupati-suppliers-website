import React from 'react';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import { routes } from './routes';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { ScrollToTop } from '../components/layout/ScrollToTop';

const AppRoutes: React.FC = () => {
  const element = useRoutes(routes);
  return <div className="flex-1">{element}</div>;
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <AppRoutes />
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
