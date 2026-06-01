import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Search from './Search';

describe('Search Component', () => {
  const mockOnSearch = vi.fn();

  beforeEach(() => {
    mockOnSearch.mockClear();
  });

  describe('Rendering', () => {
    it('renders search input and search button', () => {
      render(<Search initialValue="" onSearch={mockOnSearch} />);

      expect(
        screen.getByPlaceholderText('Search Pokemon by name…')
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: 'Search' })
      ).toBeInTheDocument();
    });

    it('displays the initialValue prop on mount', () => {
      render(<Search initialValue="pikachu" onSearch={mockOnSearch} />);

      expect(
        screen.getByPlaceholderText('Search Pokemon by name…')
      ).toHaveValue('pikachu');
    });

    it('shows empty input when initialValue is empty', () => {
      render(<Search initialValue="" onSearch={mockOnSearch} />);

      expect(
        screen.getByPlaceholderText('Search Pokemon by name…')
      ).toHaveValue('');
    });
  });

  describe('User Interaction', () => {
    it('updates input value when user types', async () => {
      const user = userEvent.setup();
      render(<Search initialValue="" onSearch={mockOnSearch} />);

      await user.type(
        screen.getByPlaceholderText('Search Pokemon by name…'),
        'bulbasaur'
      );

      expect(
        screen.getByPlaceholderText('Search Pokemon by name…')
      ).toHaveValue('bulbasaur');
    });

    it('triggers search callback with correct term when button is clicked', async () => {
      const user = userEvent.setup();
      render(<Search initialValue="" onSearch={mockOnSearch} />);

      await user.type(
        screen.getByPlaceholderText('Search Pokemon by name…'),
        'eevee'
      );
      await user.click(screen.getByRole('button', { name: 'Search' }));

      expect(mockOnSearch).toHaveBeenCalledWith('eevee');
    });

    it('triggers search callback when Enter key is pressed', async () => {
      const user = userEvent.setup();
      render(<Search initialValue="" onSearch={mockOnSearch} />);

      await user.type(
        screen.getByPlaceholderText('Search Pokemon by name…'),
        'mewtwo{Enter}'
      );

      expect(mockOnSearch).toHaveBeenCalledWith('mewtwo');
    });
  });
});
