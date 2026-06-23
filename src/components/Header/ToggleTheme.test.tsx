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
    document.documentElement.classList.remove('dark');
  });

  it('renders the toggle button', () => {
    renderToggleTheme();
    expect(
      screen.getByRole('button', { name: /toggle theme/i })
    ).toBeInTheDocument();
  });

  it('applies dark class to html when theme is dark by default', () => {
    renderToggleTheme();
    expect(document.documentElement).toHaveClass('dark');
  });

  it('removes dark class when clicked in dark mode', async () => {
    const user = userEvent.setup();
    renderToggleTheme();
    await user.click(screen.getByRole('button', { name: /toggle theme/i }));
    expect(document.documentElement).not.toHaveClass('dark');
  });

  it('adds dark class when clicked again', async () => {
    const user = userEvent.setup();
    renderToggleTheme();
    await user.click(screen.getByRole('button', { name: /toggle theme/i })); // dark → light
    await user.click(screen.getByRole('button', { name: /toggle theme/i })); // light → dark
    expect(document.documentElement).toHaveClass('dark');
  });

  it('saves theme to localStorage', async () => {
    const user = userEvent.setup();
    renderToggleTheme();
    await user.click(screen.getByRole('button', { name: /toggle theme/i }));
    expect(localStorage.getItem('theme')).toBe('light');
  });
});
