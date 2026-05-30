import { type ReactNode } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';

import ThemeProvider from '../../context/ThemeProvider';
import type { makeStore } from '../test-utils';

export type AppStore = ReturnType<typeof makeStore>;

export function AppProviders({
  children,
  store,
}: {
  children: ReactNode;
  store: AppStore;
}) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <MemoryRouter>{children}</MemoryRouter>
      </ThemeProvider>
    </Provider>
  );
}
