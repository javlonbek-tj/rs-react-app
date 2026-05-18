import { render, screen } from '@testing-library/react';
import AboutPage from './AboutPage';

describe('AboutPage Component', () => {
  describe('Author information', () => {
    it('renders the author name', () => {
      render(<AboutPage />);
      expect(screen.getByText('Javlonbek Turdimatov')).toBeInTheDocument();
    });

    it('renders all tech stack items', () => {
      render(<AboutPage />);
      const technologies = [
        'React',
        'TypeScript',
        'Next.js',
        'Node.js',
        'Express.js',
        'PostgreSQL',
        'MongoDB',
      ];
      technologies.forEach((tech) => {
        expect(screen.getByText(tech)).toBeInTheDocument();
      });
    });
  });

  describe('Course link', () => {
    it('renders the RS School React course link', () => {
      render(<AboutPage />);
      const link = screen.getByRole('link', { name: 'RS School React course' });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', 'https://rs.school/courses/reactjs');
    });

    it('opens the course link in a new tab', () => {
      render(<AboutPage />);
      const link = screen.getByRole('link', { name: 'RS School React course' });
      expect(link).toHaveAttribute('target', '_blank');
    });
  });

  describe('Project information', () => {
    it('renders the PokeAPI link', () => {
      render(<AboutPage />);
      const link = screen.getByRole('link', { name: 'PokeAPI' });
      expect(link).toHaveAttribute('href', 'https://pokeapi.co');
    });
  });
});
