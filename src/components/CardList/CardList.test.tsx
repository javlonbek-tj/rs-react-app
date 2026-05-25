import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import CardList from './CardList';
import selectedPokemonReducer from '../../app/selectedPokemonSlice';
import type { Pokemon } from '../../types/api';

function makeStore() {
  return configureStore({ reducer: { selectedPokemon: selectedPokemonReducer } });
}

function renderCardList(pokemons: Pokemon[]) {
  render(
    <Provider store={makeStore()}>
      <MemoryRouter>
        <CardList pokemons={pokemons} />
      </MemoryRouter>
    </Provider>
  );
}

const makePokemon = (overrides: Partial<Pokemon> = {}): Pokemon => ({
  id: 1,
  name: 'bulbasaur',
  image: 'https://example.com/bulbasaur.png',
  types: ['grass', 'poison'],
  ...overrides,
});

describe('CardList Component', () => {
  describe('Rendering', () => {
    it('renders the correct number of cards when data is provided', () => {
      renderCardList([
        makePokemon({ id: 1, name: 'bulbasaur' }),
        makePokemon({ id: 2, name: 'charmander' }),
        makePokemon({ id: 3, name: 'squirtle' }),
      ]);
      expect(screen.getAllByRole('img')).toHaveLength(3);
    });
  });

  describe('Data Display', () => {
    it('correctly displays each pokemon name', () => {
      renderCardList([
        makePokemon({ id: 1, name: 'pikachu' }),
        makePokemon({ id: 2, name: 'mewtwo' }),
      ]);
      expect(screen.getByText('pikachu')).toBeInTheDocument();
      expect(screen.getByText('mewtwo')).toBeInTheDocument();
    });

    it('renders pokemon image with correct alt text', () => {
      renderCardList([makePokemon({ name: 'eevee' })]);
      expect(screen.getByAltText('eevee')).toBeInTheDocument();
    });

    it('displays the correct pokemon ID badge', () => {
      renderCardList([makePokemon({ id: 7 })]);
      expect(screen.getByText('#007')).toBeInTheDocument();
    });

    it('displays all types for each pokemon', () => {
      renderCardList([makePokemon({ types: ['fire', 'flying'] })]);
      expect(screen.getByText('fire')).toBeInTheDocument();
      expect(screen.getByText('flying')).toBeInTheDocument();
    });
  });
});
