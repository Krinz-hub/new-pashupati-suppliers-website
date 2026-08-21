import { RouteObject } from 'react-router-dom';
import { Home } from '../pages/Home';
import { About } from '../pages/About';
import { Products } from '../pages/Products';
import { Wholesale } from '../pages/Wholesale';
import { Portfolio } from '../pages/Portfolio';
import { Contact } from '../pages/Contact';
import { NotFound } from '../pages/NotFound';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '/products',
    element: <Products />,
  },
  {
    path: '/wholesale',
    element: <Wholesale />,
  },
  {
    path: '/portfolio',
    element: <Portfolio />,
  },
  {
    path: '/contact',
    element: <Contact />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];
