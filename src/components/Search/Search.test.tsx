import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NextIntlClientProvider } from 'next-intl';
import messages from '../../messages/en.json';
import Search from './Search';

function renderSearch(initialValue = '') {
  return render(
    <NextIntlClientProvider locale="en" messages={messages}>
      <Search initialValue={initialValue} />
    </NextIntlClientProvider>
  );
}

describe('Search Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders search input and search button', () => {
    renderSearch();

    expect(
      screen.getByPlaceholderText('Search Pokemon by name...')
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });

  it('displays the initialValue prop on mount', () => {
    renderSearch('pikachu');

    expect(screen.getByPlaceholderText('Search Pokemon by name...')).toHaveValue(
      'pikachu'
    );
  });

  it('shows empty input when initialValue is empty', () => {
    renderSearch();

    expect(screen.getByPlaceholderText('Search Pokemon by name...')).toHaveValue(
      ''
    );
  });

  it('updates input value when user types', async () => {
    const user = userEvent.setup();
    renderSearch();

    await user.type(
      screen.getByPlaceholderText('Search Pokemon by name...'),
      'bulbasaur'
    );

    expect(screen.getByPlaceholderText('Search Pokemon by name...')).toHaveValue(
      'bulbasaur'
    );
  });

  it('stores the rendered search value in localStorage', () => {
    renderSearch('eevee');

    expect(localStorage.getItem('pokemon-search')).toBe('eevee');
  });
});
