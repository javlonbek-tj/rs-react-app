import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router';
import Pagination from './Pagination';

function renderPagination(
  total: number,
  limit: number,
  initialEntry = '/?page=1'
) {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <Routes>
        <Route path="/" element={<Pagination total={total} limit={limit} />} />
      </Routes>
    </MemoryRouter>
  );
}

describe('Pagination Component', () => {
  describe('Visibility', () => {
    it('renders nothing when all results fit on one page', () => {
      const { container } = renderPagination(9, 9);
      expect(container).toBeEmptyDOMElement();
    });

    it('renders nothing when total is 0', () => {
      const { container } = renderPagination(0, 9);
      expect(container).toBeEmptyDOMElement();
    });

    it('renders when there are multiple pages', () => {
      renderPagination(20, 9);
      expect(screen.getByText(/Page 1 of/)).toBeInTheDocument();
    });
  });

  describe('Display', () => {
    it('shows the correct page count', () => {
      renderPagination(27, 9);
      expect(screen.getByText('Page 1 of 3')).toBeInTheDocument();
    });

    it('shows the current page number from the URL', () => {
      renderPagination(27, 9, '/?page=2');
      expect(screen.getByText('Page 2 of 3')).toBeInTheDocument();
    });
  });

  describe('Button states', () => {
    it('disables the Previous button on the first page', () => {
      renderPagination(20, 9);
      expect(
        screen.getByRole('button', { name: /previous/i })
      ).toBeDisabled();
    });

    it('enables the Previous button on pages after the first', () => {
      renderPagination(20, 9, '/?page=2');
      expect(
        screen.getByRole('button', { name: /previous/i })
      ).not.toBeDisabled();
    });

    it('disables the Next button on the last page', () => {
      renderPagination(18, 9, '/?page=2');
      expect(screen.getByRole('button', { name: /next/i })).toBeDisabled();
    });

    it('enables the Next button when there are more pages', () => {
      renderPagination(20, 9);
      expect(
        screen.getByRole('button', { name: /next/i })
      ).not.toBeDisabled();
    });
  });

  describe('Navigation', () => {
    it('advances to the next page when Next is clicked', async () => {
      const user = userEvent.setup();
      renderPagination(27, 9);
      await user.click(screen.getByRole('button', { name: /next/i }));
      expect(screen.getByText('Page 2 of 3')).toBeInTheDocument();
    });

    it('goes back to the previous page when Previous is clicked', async () => {
      const user = userEvent.setup();
      renderPagination(27, 9, '/?page=2');
      await user.click(screen.getByRole('button', { name: /previous/i }));
      expect(screen.getByText('Page 1 of 3')).toBeInTheDocument();
    });
  });
});
