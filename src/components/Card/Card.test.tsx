import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router';
import Card from './Card';
import selectedPokemonReducer from '../../app/selectedPokemonSlice';
import type { Pokemon } from '../../types/api';

const makePokemon = (overrides: Partial<Pokemon> = {}): Pokemon => ({
  id: 1,
  name: 'bulbasaur',
  image: 'https://example.com/bulbasaur.png',
  types: ['grass'],
  ...overrides,
});

function makeStore() {
  return configureStore({ reducer: { selectedPokemon: selectedPokemonReducer } });
}

function renderCard(pokemon: Pokemon) {
  const store = makeStore();
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Card pokemon={pokemon} />
      </MemoryRouter>
    </Provider>
  );
  return store;
}

describe('Card Component', () => {
  describe('Rendering', () => {
    it('renders the pokemon name', () => {
      renderCard(makePokemon({ name: 'pikachu' }));
      expect(screen.getByText('pikachu')).toBeInTheDocument();
    });

    it('renders the pokemon image with correct src and alt text', () => {
      const image = 'https://example.com/pikachu.png';
      renderCard(makePokemon({ name: 'pikachu', image }));
      const img = screen.getByAltText('pikachu');
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('src', image);
    });

    it('displays the pokemon ID padded to 3 digits', () => {
      renderCard(makePokemon({ id: 1 }));
      expect(screen.getByText('#001')).toBeInTheDocument();
    });

    it('displays a 3-digit ID without padding when ID is already 3 digits', () => {
      renderCard(makePokemon({ id: 150 }));
      expect(screen.getByText('#150')).toBeInTheDocument();
    });
  });

  describe('Type Badges', () => {
    it('renders a single type badge', () => {
      renderCard(makePokemon({ types: ['fire'] }));
      expect(screen.getByText('fire')).toBeInTheDocument();
    });

    it('renders multiple type badges for dual-type pokemon', () => {
      renderCard(makePokemon({ types: ['water', 'flying'] }));
      expect(screen.getByText('water')).toBeInTheDocument();
      expect(screen.getByText('flying')).toBeInTheDocument();
    });

    it('applies the correct color class for a known type', () => {
      renderCard(makePokemon({ types: ['fire'] }));
      const badge = screen.getByText('fire');
      expect(badge).toHaveClass('bg-orange-100', 'text-orange-700');
    });

    it('applies fallback color class for an unknown type', () => {
      renderCard(makePokemon({ types: ['cosmic'] }));
      const badge = screen.getByText('cosmic');
      expect(badge).toHaveClass('bg-slate-100', 'text-slate-600');
    });
  });

  describe('Checkbox', () => {
    it('renders an unchecked checkbox by default', () => {
      renderCard(makePokemon());
      expect(screen.getByRole('checkbox')).not.toBeChecked();
    });

    it('checks the checkbox when clicked', async () => {
      const user = userEvent.setup();
      const store = renderCard(makePokemon({ id: 1 }));
      await user.click(screen.getByRole('checkbox'));
      expect(store.getState().selectedPokemon.selectedIds).toContain(1);
    });

    it('unchecks the checkbox on second click', async () => {
      const user = userEvent.setup();
      const store = renderCard(makePokemon({ id: 1 }));
      await user.click(screen.getByRole('checkbox'));
      await user.click(screen.getByRole('checkbox'));
      expect(store.getState().selectedPokemon.selectedIds).not.toContain(1);
    });
  });
});
