import { render, screen } from '@testing-library/react';
import Spinner from './Spinner';

describe('Spinner Component', () => {
  describe('Rendering', () => {
    it('renders the loading text', () => {
      render(<Spinner />);

      expect(screen.getByText('Loading Pokémon...')).toBeInTheDocument();
    });

    it('renders the spinner element', () => {
      const { container } = render(<Spinner />);

      const spinner = container.querySelector('.animate-spin');
      expect(spinner).toBeInTheDocument();
    });
  });
});
