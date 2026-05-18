import { createBrowserRouter, RouterProvider } from 'react-router';
import AppLayout from '../components/AppLayout/AppLayout';
import HomePage from '../pages/HomePage';
import DetailPanel from '../components/DetailPanel/DetailPanel';
import AboutPage from '../pages/AboutPage';
import NotFoundPage from '../pages/NotFoundPage';
import RouteErrorPage from '../pages/RouteErrorPage';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <RouteErrorPage />,
    children: [
      {
        path: '/',
        element: <HomePage />,
        children: [
          { path: 'details/:id', element: <DetailPanel /> },
        ],
      },
      {
        path: '/about',
        element: <AboutPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
