import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from './SearchBar';

describe('SearchBar Component', () => {
  it('renders the search input', () => {
    render(<SearchBar onSearch={vi.fn()} />);
    expect(
      screen.getByPlaceholderText('Search Pokemon by name…')
    ).toBeInTheDocument();
  });

  it('renders the search button', () => {
    render(<SearchBar onSearch={vi.fn()} />);
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });

  it('calls onSearch with the typed value when the button is clicked', async () => {
    const onSearch = vi.fn();
    const user = userEvent.setup();
    render(<SearchBar onSearch={onSearch} />);

    await user.type(
      screen.getByPlaceholderText('Search Pokemon by name…'),
      'pikachu'
    );
    await user.click(screen.getByRole('button', { name: 'Search' }));

    expect(onSearch).toHaveBeenCalledWith('pikachu');
  });
});
