import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { configureStore } from '@reduxjs/toolkit';
import { NextIntlClientProvider } from 'next-intl';
import { Provider } from 'react-redux';
import Flyout from './Flyout';
import selectedPokemonReducer, {
  togglePokemon,
} from '../../app-apis/selectedPokemonSlice';
import messages from '../../messages/en.json';

function makeStore(selectedIds: number[] = []) {
  const store = configureStore({
    reducer: { selectedPokemon: selectedPokemonReducer },
  });
  selectedIds.forEach((id) => store.dispatch(togglePokemon(id)));
  return store;
}

function renderFlyout(selectedIds: number[] = []) {
  const store = makeStore(selectedIds);
  render(
    <NextIntlClientProvider locale="en" messages={messages}>
      <Provider store={store}>
        <Flyout />
      </Provider>
    </NextIntlClientProvider>
  );
  return store;
}

describe('Flyout Component', () => {
  it('does not render when no items are selected', () => {
    renderFlyout([]);
    expect(screen.queryByText(/selected/i)).not.toBeInTheDocument();
  });

  it('renders when at least one item is selected', () => {
    renderFlyout([1]);
    expect(screen.getByText(/1 Pokemon/i)).toBeInTheDocument();
  });

  it('shows the correct count of selected items', () => {
    renderFlyout([1, 2]);
    expect(screen.getByText(/2 Pokemon/i)).toBeInTheDocument();
  });

  it('renders Unselect all and Download link', () => {
    renderFlyout([1]);
    expect(
      screen.getByRole('button', { name: /unselect all/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /download/i })).toBeInTheDocument();
  });

  it('clears selection when Unselect all is clicked', async () => {
    const user = userEvent.setup();
    const store = renderFlyout([1, 2]);
    await user.click(screen.getByRole('button', { name: /unselect all/i }));
    expect(store.getState().selectedPokemon.selectedIds).toEqual([]);
  });

  it('links to the server CSV route with selected ids', () => {
    renderFlyout([1, 2]);
    expect(screen.getByRole('link', { name: /download/i })).toHaveAttribute(
      'href',
      '/api/csv?ids=1,2'
    );
  });

  it('uses the selected item count in the filename', () => {
    renderFlyout([1, 2]);
    expect(screen.getByRole('link', { name: /download/i })).toHaveAttribute(
      'download',
      '2_items.csv'
    );
  });
});
