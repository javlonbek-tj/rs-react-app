import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
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
      render(<MemoryRouter><Card pokemon={makePokemon({ name: 'pikachu' })} /></MemoryRouter>);

      expect(screen.getByText('pikachu')).toBeInTheDocument();
    });

    it('renders the pokemon image with correct src and alt text', () => {
      const image = 'https://example.com/pikachu.png';
      render(<MemoryRouter><Card pokemon={makePokemon({ name: 'pikachu', image })} /></MemoryRouter>);

      const img = screen.getByAltText('pikachu');
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('src', image);
    });

    it('displays the pokemon ID padded to 3 digits', () => {
      render(<MemoryRouter><Card pokemon={makePokemon({ id: 1 })} /></MemoryRouter>);
      expect(screen.getByText('#001')).toBeInTheDocument();
    });

    it('displays a 3-digit ID without padding when ID is already 3 digits', () => {
      render(<MemoryRouter><Card pokemon={makePokemon({ id: 150 })} /></MemoryRouter>);
      expect(screen.getByText('#150')).toBeInTheDocument();
    });
  });

  describe('Type Badges', () => {
    it('renders a single type badge', () => {
      render(<MemoryRouter><Card pokemon={makePokemon({ types: ['fire'] })} /></MemoryRouter>);

      expect(screen.getByText('fire')).toBeInTheDocument();
    });

    it('renders multiple type badges for dual-type pokemon', () => {
      render(<MemoryRouter><Card pokemon={makePokemon({ types: ['water', 'flying'] })} /></MemoryRouter>);

      expect(screen.getByText('water')).toBeInTheDocument();
      expect(screen.getByText('flying')).toBeInTheDocument();
    });

    it('applies the correct color class for a known type', () => {
      render(<MemoryRouter><Card pokemon={makePokemon({ types: ['fire'] })} /></MemoryRouter>);

      const badge = screen.getByText('fire');
      expect(badge).toHaveClass('bg-orange-100', 'text-orange-700');
    });

    it('applies fallback color class for an unknown type', () => {
      render(<MemoryRouter><Card pokemon={makePokemon({ types: ['cosmic'] })} /></MemoryRouter>);

      const badge = screen.getByText('cosmic');
      expect(badge).toHaveClass('bg-slate-100', 'text-slate-600');
    });
  });
});
