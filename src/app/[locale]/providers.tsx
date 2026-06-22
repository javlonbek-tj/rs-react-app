'use client';

import type { ComponentProps, ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '@/app-apis/store';
import ThemeProvider from '@/context/ThemeProvider';

type Messages = ComponentProps<typeof NextIntlClientProvider>['messages'];

interface ProvidersProps {
  children: ReactNode;
  locale: string;
  messages: Messages;
}

export default function Providers({
  children,
  locale,
  messages,
}: ProvidersProps) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ReduxProvider store={store}>
        <ThemeProvider>{children}</ThemeProvider>
      </ReduxProvider>
    </NextIntlClientProvider>
  );
}
