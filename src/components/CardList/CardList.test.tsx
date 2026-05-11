import { render, screen } from '@testing-library/react';
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

      render(<CardList pokemon={pokemon} />);

      expect(screen.getAllByRole('img')).toHaveLength(3);
    });

    it('displays "No Pokémon to display" message when data array is empty', () => {
      render(<CardList pokemon={[]} />);

      expect(screen.getByText('No Pokémon to display.')).toBeInTheDocument();
      expect(
        screen.getByText('Enter a name above and hit Search.')
      ).toBeInTheDocument();
    });

    it('does not show empty state when data is provided', () => {
      render(<CardList pokemon={[makePokemon()]} />);

      expect(
        screen.queryByText('No Pokémon to display.')
      ).not.toBeInTheDocument();
    });
  });

  describe('Data Display', () => {
    it('correctly displays each pokemon name', () => {
      const pokemon = [
        makePokemon({ id: 1, name: 'pikachu' }),
        makePokemon({ id: 2, name: 'mewtwo' }),
      ];

      render(<CardList pokemon={pokemon} />);

      expect(screen.getByText('pikachu')).toBeInTheDocument();
      expect(screen.getByText('mewtwo')).toBeInTheDocument();
    });

    it('renders pokemon image with correct alt text', () => {
      render(<CardList pokemon={[makePokemon({ name: 'eevee' })]} />);

      expect(screen.getByAltText('eevee')).toBeInTheDocument();
    });

    it('displays the correct pokemon ID badge', () => {
      render(<CardList pokemon={[makePokemon({ id: 7 })]} />);

      expect(screen.getByText('#007')).toBeInTheDocument();
    });

    it('displays all types for each pokemon', () => {
      render(
        <CardList
          pokemon={[makePokemon({ types: ['fire', 'flying'] })]}
        />
      );

      expect(screen.getByText('fire')).toBeInTheDocument();
      expect(screen.getByText('flying')).toBeInTheDocument();
    });
  });
});
