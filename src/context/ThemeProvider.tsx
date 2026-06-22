'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';
import type { Theme } from './ThemeCtx';
import { ThemeCtx } from './ThemeCtx';

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === 'undefined') {
      return 'light';
    }

    return localStorage.getItem('theme') === 'dark' ? 'dark' : 'light';
  });

  const setTheme = (nextTheme: Theme) => {
    setThemeState(nextTheme);
    localStorage.setItem('theme', nextTheme);
  };

  return (
    <ThemeCtx.Provider value={{ theme, setTheme }}>
      <div className={theme === 'dark' ? 'dark min-h-screen' : 'min-h-screen'}>
        {children}
      </div>
    </ThemeCtx.Provider>
  );
}
