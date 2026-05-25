import { createContext, useContext } from 'react';

export type Theme = 'light' | 'dark';

export const ThemeCtx = createContext<{
  theme: Theme;
  setTheme: (t: Theme) => void;
}>({ theme: 'light', setTheme: () => {} });

export function useTheme() {
  const context = useContext(ThemeCtx);

  if (!context) {
    throw new Error('useTheme must be used inside ThemeProvider');
  }

  return context;
}
