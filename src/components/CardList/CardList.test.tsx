import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import CardList from './CardList';
import type { Pokemon } from '../../types/api';

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
      const pokemon = [
        makePokemon({ id: 1, name: 'bulbasaur' }),
        makePokemon({ id: 2, name: 'charmander' }),
        makePokemon({ id: 3, name: 'squirtle' }),
      ];

      render(<MemoryRouter><CardList pokemons={pokemon} /></MemoryRouter>);

      expect(screen.getAllByRole('img')).toHaveLength(3);
    });
  });

  describe('Data Display', () => {
    it('correctly displays each pokemon name', () => {
      const pokemon = [
        makePokemon({ id: 1, name: 'pikachu' }),
        makePokemon({ id: 2, name: 'mewtwo' }),
      ];

      render(<MemoryRouter><CardList pokemons={pokemon} /></MemoryRouter>);

      expect(screen.getByText('pikachu')).toBeInTheDocument();
      expect(screen.getByText('mewtwo')).toBeInTheDocument();
    });

    it('renders pokemon image with correct alt text', () => {
      render(<MemoryRouter><CardList pokemons={[makePokemon({ name: 'eevee' })]} /></MemoryRouter>);

      expect(screen.getByAltText('eevee')).toBeInTheDocument();
    });

    it('displays the correct pokemon ID badge', () => {
      render(<MemoryRouter><CardList pokemons={[makePokemon({ id: 7 })]} /></MemoryRouter>);

      expect(screen.getByText('#007')).toBeInTheDocument();
    });

    it('displays all types for each pokemon', () => {
      render(
        <MemoryRouter><CardList pokemons={[makePokemon({ types: ['fire', 'flying'] })]} /></MemoryRouter>
      );

      expect(screen.getByText('fire')).toBeInTheDocument();
      expect(screen.getByText('flying')).toBeInTheDocument();
    });
  });
});
