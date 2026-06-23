import { type ReactNode } from 'react';
import { Provider } from 'react-redux';
import { NextIntlClientProvider } from 'next-intl';

import ThemeProvider from '../../context/ThemeProvider';
import type { makeStore } from '../test-utils';
import messages from '../../messages/en.json';

export type AppStore = ReturnType<typeof makeStore>;

export function AppProviders({
  children,
  store,
}: {
  children: ReactNode;
  store: AppStore;
}) {
  return (
    <NextIntlClientProvider locale="en" messages={messages}>
      <Provider store={store}>
        <ThemeProvider>{children}</ThemeProvider>
      </Provider>
    </NextIntlClientProvider>
  );
}
