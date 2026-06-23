'use client';

import { useState } from 'react';
import { ThemeCtx, type Theme } from './ThemeCtx';

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'dark';

    const stored = localStorage.getItem('theme') as Theme;
    const initial: Theme = stored === 'light' ? 'light' : 'dark';
    document.documentElement.classList.toggle('dark', initial === 'dark');
    return initial;
  });

  const setTheme = (t: Theme) => {
    setThemeState(t);
    localStorage.setItem('theme', t);
    document.documentElement.classList.toggle('dark', t === 'dark');
  };

  return (
    <ThemeCtx.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeCtx.Provider>
  );
}
