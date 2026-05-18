import { createBrowserRouter, RouterProvider, useSearchParams } from 'react-router';
import AppLayout from '../components/AppLayout/AppLayout';
import HomePage from '../pages/HomePage';
import AboutPage from '../pages/AboutPage';
import NotFoundPage from '../pages/NotFoundPage';
import RouteErrorPage from '../pages/RouteErrorPage';
import DetailPanel from '../components/DetailPanel/DetailPanel';

function DetailRoute() {
  const [searchParams] = useSearchParams();
  const detailId = searchParams.get('details');
  if (!detailId) return null;
  return <DetailPanel id={detailId} />;
}

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <RouteErrorPage />,
    children: [
      {
        path: '/',
        element: <HomePage />,
        children: [{ index: true, element: <DetailRoute /> }],
      },
      { path: '/about', element: <AboutPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
