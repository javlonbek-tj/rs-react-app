import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ToggleTheme from './ToggleTheme';
import ThemeProvider from '../../context/ThemeProvider';

function renderToggleTheme() {
  return render(
    <ThemeProvider>
      <ToggleTheme />
    </ThemeProvider>
  );
}

describe('ToggleTheme', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders the toggle button', () => {
    renderToggleTheme();
    expect(
      screen.getByRole('button', { name: /toggle theme/i })
    ).toBeInTheDocument();
  });

  it('applies dark class when clicked in light mode', async () => {
    const user = userEvent.setup();
    const { container } = renderToggleTheme();
    await user.click(screen.getByRole('button', { name: /toggle theme/i }));
    expect(container.firstElementChild).toHaveClass('dark');
  });

  it('removes dark class when clicked again', async () => {
    const user = userEvent.setup();
    const { container } = renderToggleTheme();
    await user.click(screen.getByRole('button', { name: /toggle theme/i }));
    await user.click(screen.getByRole('button', { name: /toggle theme/i }));
    expect(container.firstElementChild).not.toHaveClass('dark');
  });
});
