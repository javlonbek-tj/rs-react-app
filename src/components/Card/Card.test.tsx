import { render } from '../../__tests__/test-utils';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import Card from './Card';
import type { Pokemon } from '../../types/api';

const makePokemon = (overrides: Partial<Pokemon> = {}): Pokemon => ({
  id: 1,
  name: 'bulbasaur',
  image: 'https://example.com/bulbasaur.png',
  types: ['grass'],
  ...overrides,
});

describe('Card Component', () => {
  describe('Rendering', () => {
    it('renders the pokemon name', () => {
      render(<Card pokemon={makePokemon({ name: 'pikachu' })} />);
      expect(screen.getByText('pikachu')).toBeInTheDocument();
    });

    it('renders the pokemon image with correct src and alt text', () => {
      const image = 'https://example.com/pikachu.png';
      render(<Card pokemon={makePokemon({ name: 'pikachu', image })} />);
      const img = screen.getByAltText('pikachu');
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('src', image);
    });

    it('displays the pokemon ID padded to 3 digits', () => {
      render(<Card pokemon={makePokemon({ id: 1 })} />);
      expect(screen.getByText('#001')).toBeInTheDocument();
    });

    it('displays a 3-digit ID without padding when ID is already 3 digits', () => {
      render(<Card pokemon={makePokemon({ id: 150 })} />);
      expect(screen.getByText('#150')).toBeInTheDocument();
    });
  });

  describe('Type Badges', () => {
    it('renders a single type badge', () => {
      render(<Card pokemon={makePokemon({ types: ['fire'] })} />);
      expect(screen.getByText('fire')).toBeInTheDocument();
    });

    it('renders multiple type badges for dual-type pokemon', () => {
      render(<Card pokemon={makePokemon({ types: ['water', 'flying'] })} />);
      expect(screen.getByText('water')).toBeInTheDocument();
      expect(screen.getByText('flying')).toBeInTheDocument();
    });

    it('applies the correct color class for a known type', () => {
      render(<Card pokemon={makePokemon({ types: ['fire'] })} />);
      const badge = screen.getByText('fire');
      expect(badge).toHaveClass('bg-orange-100', 'text-orange-700');
    });

    it('applies fallback color class for an unknown type', () => {
      render(<Card pokemon={makePokemon({ types: ['cosmic'] })} />);
      const badge = screen.getByText('cosmic');
      expect(badge).toHaveClass('bg-slate-100', 'text-slate-600');
    });
  });

  describe('Checkbox', () => {
    it('renders an unchecked checkbox by default', () => {
      render(<Card pokemon={makePokemon()} />);
      expect(screen.getByRole('checkbox')).not.toBeChecked();
    });

    it('checks the checkbox when clicked', async () => {
      const user = userEvent.setup();
      const { store } = render(<Card pokemon={makePokemon({ id: 1 })} />);
      await user.click(screen.getByRole('checkbox'));
      expect(store.getState().selectedPokemon.selectedIds).toContain(1);
    });

    it('unchecks the checkbox on second click', async () => {
      const user = userEvent.setup();
      const { store } = render(<Card pokemon={makePokemon({ id: 1 })} />);
      await user.click(screen.getByRole('checkbox'));
      await user.click(screen.getByRole('checkbox'));
      expect(store.getState().selectedPokemon.selectedIds).not.toContain(1);
    });
  });
});
