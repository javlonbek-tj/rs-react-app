import { render, screen } from '@testing-library/react';
import ErrorState from './ErrorState';

describe('ErrorState Component', () => {
  it('renders the provided error message', () => {
    render(<ErrorState message="Something went wrong (500). Please try again." />);
    expect(
      screen.getByText('Something went wrong (500). Please try again.')
    ).toBeInTheDocument();
  });

  it('renders a different message correctly', () => {
    render(<ErrorState message="No Pokemon found with that name." />);
    expect(
      screen.getByText('No Pokemon found with that name.')
    ).toBeInTheDocument();
  });

  it('renders the sad face emoji', () => {
    render(<ErrorState message="Error" />);
    expect(screen.getByText('😔')).toBeInTheDocument();
  });
});
