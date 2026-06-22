import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import messages from '../../messages/en.json';
import SearchBar from './SearchBar';

function renderSearchBar(initialValue = '') {
  render(
    <NextIntlClientProvider locale="en" messages={messages}>
      <SearchBar initialValue={initialValue} />
    </NextIntlClientProvider>
  );
}

describe('SearchBar Component', () => {
  it('renders the search input', () => {
    renderSearchBar();
    expect(
      screen.getByPlaceholderText('Search Pokemon by name...')
    ).toBeInTheDocument();
  });

  it('renders the search button', () => {
    renderSearchBar();
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });

  it('displays the initialValue prop on mount', () => {
    renderSearchBar('pikachu');
    expect(screen.getByPlaceholderText('Search Pokemon by name...')).toHaveValue(
      'pikachu'
    );
  });
});
