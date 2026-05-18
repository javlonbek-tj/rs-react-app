import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import NotFoundPage from './NotFoundPage';

function renderNotFoundPage() {
  render(
    <MemoryRouter>
      <NotFoundPage />
    </MemoryRouter>
  );
}

describe('NotFoundPage Component', () => {
  it('renders the 404 status code', () => {
    renderNotFoundPage();
    expect(screen.getByText('404')).toBeInTheDocument();
  });

  it('renders the "Page not found" heading', () => {
    renderNotFoundPage();
    expect(
      screen.getByRole('heading', { name: 'Page not found' })
    ).toBeInTheDocument();
  });

  it('renders a descriptive message', () => {
    renderNotFoundPage();
    expect(
      screen.getByText(/The page you are looking for does not exist/)
    ).toBeInTheDocument();
  });

  it('renders a link back to the home page', () => {
    renderNotFoundPage();
    const link = screen.getByRole('link', { name: 'Back to Pokemon' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });
});
