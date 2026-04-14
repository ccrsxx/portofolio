import '@styles/globals.css';

import { configure, start, done } from 'nprogress';
import { AnimatePresence } from 'framer-motion';
import { Router, useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from 'next-themes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Layout } from '@components/layout/layout';
import { AppHead } from '@components/common/app-head';
import type { AppProps } from 'next/app';

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
      <Analytics />
    </QueryClientProvider>
  );
}
