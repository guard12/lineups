'use client';

import { Provider } from 'jotai';
import { ThemeProvider } from './theme-provider';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        {children}
      </ThemeProvider>
    </Provider>
  );
};
