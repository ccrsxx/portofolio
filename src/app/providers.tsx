'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { useState, type PropsWithChildren } from 'react';

export function Providers({ children }: PropsWithChildren): React.JSX.Element {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute='class' defaultTheme='dark' enableSystem={false}>
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  );
}
