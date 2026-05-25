import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Flyout from './Flyout';
import selectedPokemonReducer, {
  togglePokemon,
} from '../../app/selectedPokemonSlice';
import type { Pokemon } from '../../types/api';

const mockPokemons: Pokemon[] = [
  { id: 1, name: 'bulbasaur', image: 'bulbasaur.png', types: ['grass'] },
  { id: 2, name: 'ivysaur', image: 'ivysaur.png', types: ['grass', 'poison'] },
];

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
    <Provider store={store}>
      <Flyout pokemon={mockPokemons} />
    </Provider>
  );
  return store;
}

describe('Flyout Component', () => {
  beforeEach(() => {
    global.URL.createObjectURL = vi.fn(() => 'blob:mock');
    global.URL.revokeObjectURL = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

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

  it('renders Unselect all and Download buttons', () => {
    renderFlyout([1]);
    expect(
      screen.getByRole('button', { name: /unselect all/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /download/i })
    ).toBeInTheDocument();
  });

  it('clears selection when Unselect all is clicked', async () => {
    const user = userEvent.setup();
    const store = renderFlyout([1, 2]);
    await user.click(screen.getByRole('button', { name: /unselect all/i }));
    expect(store.getState().selectedPokemon.selectedIds).toEqual([]);
  });

  describe('Download', () => {
    it('triggers a file download when Download is clicked', async () => {
      const user = userEvent.setup();
      const clickSpy = vi
        .spyOn(HTMLAnchorElement.prototype, 'click')
        .mockImplementation(() => {});
      renderFlyout([1]);
      await user.click(screen.getByRole('button', { name: /download/i }));
      expect(clickSpy).toHaveBeenCalled();
    });

    it('uses the selected item count in the filename', async () => {
      const user = userEvent.setup();
      let capturedFilename = '';
      vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(
        function (this: HTMLAnchorElement) {
          capturedFilename = this.download;
        }
      );
      renderFlyout([1, 2]);
      await user.click(screen.getByRole('button', { name: /download/i }));
      expect(capturedFilename).toBe('2_items.csv');
    });
  });
});
