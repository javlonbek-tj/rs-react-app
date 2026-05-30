import { render } from '../../__tests__/test-utils';
import { screen } from '@testing-library/react';
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
      render(
        <CardList
          pokemons={[
            makePokemon({ id: 1, name: 'bulbasaur' }),
            makePokemon({ id: 2, name: 'charmander' }),
            makePokemon({ id: 3, name: 'squirtle' }),
          ]}
        />
      );
      expect(screen.getAllByRole('img')).toHaveLength(3);
    });
  });

  describe('Data Display', () => {
    it('correctly displays each pokemon name', () => {
      render(
        <CardList
          pokemons={[
            makePokemon({ id: 1, name: 'pikachu' }),
            makePokemon({ id: 2, name: 'mewtwo' }),
          ]}
        />
      );
      expect(screen.getByText('pikachu')).toBeInTheDocument();
      expect(screen.getByText('mewtwo')).toBeInTheDocument();
    });

    it('renders pokemon image with correct alt text', () => {
      render(<CardList pokemons={[makePokemon({ name: 'eevee' })]} />);
      expect(screen.getByAltText('eevee')).toBeInTheDocument();
    });

    it('displays the correct pokemon ID badge', () => {
      render(<CardList pokemons={[makePokemon({ id: 7 })]} />);
      expect(screen.getByText('#007')).toBeInTheDocument();
    });

    it('displays all types for each pokemon', () => {
      render(<CardList pokemons={[makePokemon({ types: ['fire', 'flying'] })]} />);
      expect(screen.getByText('fire')).toBeInTheDocument();
      expect(screen.getByText('flying')).toBeInTheDocument();
    });
  });
});
