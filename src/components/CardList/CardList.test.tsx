import type { ReactElement } from 'react';
import { screen } from '@testing-library/react';
import { render } from '../../__tests__/test-utils';
import CardList from './CardList';
import type { Pokemon } from '../../types/api';

const makePokemon = (overrides: Partial<Pokemon> = {}): Pokemon => ({
  id: 1,
  name: 'bulbasaur',
  image: 'https://example.com/bulbasaur.png',
  types: ['grass', 'poison'],
  ...overrides,
});

async function renderCardList(pokemons: Pokemon[]) {
  const ui = await CardList({ pokemons, currentParams: '' });
  render(ui as ReactElement);
}

describe('CardList Component', () => {
  it('renders the correct number of cards when data is provided', async () => {
    await renderCardList([
      makePokemon({ id: 1, name: 'bulbasaur' }),
      makePokemon({ id: 2, name: 'charmander' }),
      makePokemon({ id: 3, name: 'squirtle' }),
    ]);
    expect(screen.getAllByRole('img')).toHaveLength(3);
  });

  it('correctly displays each pokemon name', async () => {
    await renderCardList([
      makePokemon({ id: 1, name: 'pikachu' }),
      makePokemon({ id: 2, name: 'mewtwo' }),
    ]);
    expect(screen.getByText('pikachu')).toBeInTheDocument();
    expect(screen.getByText('mewtwo')).toBeInTheDocument();
  });

  it('renders pokemon image with correct alt text', async () => {
    await renderCardList([makePokemon({ name: 'eevee' })]);
    expect(screen.getByAltText('eevee')).toBeInTheDocument();
  });

  it('displays the correct pokemon ID badge', async () => {
    await renderCardList([makePokemon({ id: 7 })]);
    expect(screen.getByText('#007')).toBeInTheDocument();
  });

  it('displays all types for each pokemon', async () => {
    await renderCardList([makePokemon({ types: ['fire', 'flying'] })]);
    expect(screen.getByText('fire')).toBeInTheDocument();
    expect(screen.getByText('flying')).toBeInTheDocument();
  });
});
