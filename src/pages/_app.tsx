import '@styles/globals.css';

import { AppHead } from '@components/common/app-head';
import { Layout } from '@components/layout/layout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import { Router, useRouter } from 'next/router';
import { configure, done, start } from 'nprogress';
import { useEffect, useState } from 'react';

configure({ showSpinner: false });

Router.events.on('routeChangeStart', start);
Router.events.on('routeChangeError', done);
Router.events.on('routeChangeComplete', done);

const popAudio =
  typeof window !== 'undefined' ? new Audio('/assets/pop.mp3') : null;

export default function App({
  Component,
  pageProps
}: AppProps): React.JSX.Element {
  const [queryClient] = useState(() => new QueryClient());

  const { pathname } = useRouter();

  useEffect(() => void popAudio?.play().catch(() => void 0), [pathname]);

  return (
    <QueryClientProvider client={queryClient}>
      <AppHead />
      <ThemeProvider attribute='class' defaultTheme='dark' enableSystem={false}>
        <Layout>
          <AnimatePresence mode='wait'>
            <Component {...pageProps} key={pathname} />
          </AnimatePresence>
        </Layout>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
