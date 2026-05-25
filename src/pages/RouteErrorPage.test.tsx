import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import RouteErrorPage from './RouteErrorPage';

function ThrowError(): never {
  throw new Error('Test error');
}

function renderRouteErrorPage() {
  const router = createMemoryRouter([
    {
      path: '/',
      element: <ThrowError />,
      errorElement: <RouteErrorPage />,
    },
  ]);
  render(<RouterProvider router={router} />);
}

describe('RouteErrorPage Component', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the explosion emoji', () => {
    renderRouteErrorPage();
    expect(screen.getByText('💥')).toBeInTheDocument();
  });

  it('renders the "Something went wrong" heading', () => {
    renderRouteErrorPage();
    expect(
      screen.getByRole('heading', { name: 'Something went wrong' })
    ).toBeInTheDocument();
  });

  it('renders the error description', () => {
    renderRouteErrorPage();
    expect(screen.getByText(/An unexpected error occurred/)).toBeInTheDocument();
  });

  it('renders the reload button', () => {
    renderRouteErrorPage();
    expect(
      screen.getByRole('button', { name: 'Reload page' })
    ).toBeInTheDocument();
  });
});
