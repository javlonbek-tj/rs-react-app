import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ThemeProvider from './ThemeProvider';
import { useTheme } from './ThemeCtx';

function ThemeConsumer() {
  const { theme, setTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <button onClick={() => setTheme('dark')}>Set Dark</button>
      <button onClick={() => setTheme('light')}>Set Light</button>
    </div>
  );
}

function renderProvider() {
  render(
    <ThemeProvider>
      <ThemeConsumer />
    </ThemeProvider>
  );
}

describe('ThemeProvider', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
  });

  it('provides light theme by default', () => {
    renderProvider();
    expect(screen.getByTestId('theme')).toHaveTextContent('light');
  });

  it('reads initial theme from localStorage', () => {
    localStorage.setItem('theme', 'dark');
    renderProvider();
    expect(screen.getByTestId('theme')).toHaveTextContent('dark');
  });

  it('adds dark class to documentElement when theme is dark', async () => {
    const user = userEvent.setup();
    renderProvider();
    await user.click(screen.getByText('Set Dark'));
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('removes dark class when switching to light', async () => {
    const user = userEvent.setup();
    renderProvider();
    await user.click(screen.getByText('Set Dark'));
    await user.click(screen.getByText('Set Light'));
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('persists theme choice to localStorage', async () => {
    const user = userEvent.setup();
    renderProvider();
    await user.click(screen.getByText('Set Dark'));
    expect(localStorage.getItem('theme')).toBe('dark');
  });

  it('updates the displayed theme value', async () => {
    const user = userEvent.setup();
    renderProvider();
    await user.click(screen.getByText('Set Dark'));
    expect(screen.getByTestId('theme')).toHaveTextContent('dark');
  });
});
