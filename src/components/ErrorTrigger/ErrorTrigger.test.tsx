import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ErrorTrigger from './ErrorTrigger';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

describe('ErrorTrigger Component', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Rendering', () => {
    it('renders the Trigger Error button', () => {
      render(<ErrorTrigger />);

      expect(
        screen.getByRole('button', { name: 'Trigger Error' })
      ).toBeInTheDocument();
    });
  });

  describe('Error Triggering', () => {
    it('throws an error when the button is clicked', async () => {
      const user = userEvent.setup();

      render(
        <ErrorBoundary>
          <ErrorTrigger />
        </ErrorBoundary>
      );

      await user.click(screen.getByRole('button', { name: 'Trigger Error' }));

      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    });

    it('triggers ErrorBoundary fallback UI and hides the button', async () => {
      const user = userEvent.setup();

      render(
        <ErrorBoundary>
          <ErrorTrigger />
        </ErrorBoundary>
      );

      await user.click(screen.getByRole('button', { name: 'Trigger Error' }));

      expect(
        screen.queryByRole('button', { name: 'Trigger Error' })
      ).not.toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: 'Reload page' })
      ).toBeInTheDocument();
    });
  });
});
