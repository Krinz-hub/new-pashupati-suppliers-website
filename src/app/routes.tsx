import { RouteObject } from 'react-router-dom';
import { Home } from '../pages/Home';
import { About } from '../pages/About';
import { Products } from '../pages/Products';
import { ProductDetails } from '../pages/ProductDetails';
import { Categories } from '../pages/Categories';
import { CategoryDetails } from '../pages/CategoryDetails';
import { Wholesale } from '../pages/Wholesale';
import { Portfolio } from '../pages/Portfolio';
import { Blogs } from '../pages/Blogs';
import { BlogDetail } from '../pages/BlogDetail';
import { Contact } from '../pages/Contact';
import { NotFound } from '../pages/NotFound';

// Admin CMS Pages
import { AdminLogin } from '../pages/admin/AdminLogin';
import { AdminDashboard } from '../pages/admin/AdminDashboard';
import { AdminProducts } from '../pages/admin/AdminProducts';
import { AdminProductForm } from '../pages/admin/AdminProductForm';
import { AdminBlogs } from '../pages/admin/AdminBlogs';
import { AdminBlogForm } from '../pages/admin/AdminBlogForm';
import { AdminCategories } from '../pages/admin/AdminCategories';
import { AdminMedia } from '../pages/admin/AdminMedia';
import { AdminSettings } from '../pages/admin/AdminSettings';
import { AdminRoute } from '../components/admin/AdminRoute';

export const routes: RouteObject[] = [
  // Public Website Routes
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
    path: '/products/:slug',
    element: <ProductDetails />,
  },
  {
    path: '/categories',
    element: <Categories />,
  },
  {
    path: '/categories/:slug',
    element: <CategoryDetails />,
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
    path: '/blogs',
    element: <Blogs />,
  },
  {
    path: '/blogs/:slug',
    element: <BlogDetail />,
  },
  {
    path: '/contact',
    element: <Contact />,
  },

  // Admin Auth Route
  {
    path: '/admin/login',
    element: <AdminLogin />,
  },

  // Protected Admin CMS Routes
  {
    path: '/admin',
    element: (
      <AdminRoute>
        <AdminDashboard />
      </AdminRoute>
    ),
  },
  {
    path: '/admin/products',
    element: (
      <AdminRoute>
        <AdminProducts />
      </AdminRoute>
    ),
  },
  {
    path: '/admin/products/new',
    element: (
      <AdminRoute>
        <AdminProductForm />
      </AdminRoute>
    ),
  },
  {
    path: '/admin/products/:id/edit',
    element: (
      <AdminRoute>
        <AdminProductForm />
      </AdminRoute>
    ),
  },
  {
    path: '/admin/blogs',
    element: (
      <AdminRoute>
        <AdminBlogs />
      </AdminRoute>
    ),
  },
  {
    path: '/admin/blogs/new',
    element: (
      <AdminRoute>
        <AdminBlogForm />
      </AdminRoute>
    ),
  },
  {
    path: '/admin/blogs/:id/edit',
    element: (
      <AdminRoute>
        <AdminBlogForm />
      </AdminRoute>
    ),
  },
  {
    path: '/admin/categories',
    element: (
      <AdminRoute>
        <AdminCategories />
      </AdminRoute>
    ),
  },
  {
    path: '/admin/media',
    element: (
      <AdminRoute>
        <AdminMedia />
      </AdminRoute>
    ),
  },
  {
    path: '/admin/settings',
    element: (
      <AdminRoute>
        <AdminSettings />
      </AdminRoute>
    ),
  },

  // Catch-all
  {
    path: '*',
    element: <NotFound />,
  },
];
