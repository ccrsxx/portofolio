/* eslint-disable @typescript-eslint/unbound-method */

import '@styles/globals.scss';

import nProgress from 'nprogress';
import { AnimatePresence } from 'framer-motion';
import { Router, useRouter } from 'next/router';
import { useEffect } from 'react';
import { ThemeProvider } from 'next-themes';
import { Layout } from '@components/layout/layout';
import { AppHead } from '@components/common/app-head';
import type { AppProps } from 'next/app';

nProgress.configure({ showSpinner: false });

Router.events.on('routeChangeStart', nProgress.start);
Router.events.on('routeChangeError', nProgress.done);
Router.events.on('routeChangeComplete', nProgress.done);

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  const { pathname } = useRouter();

  useEffect(() => {
    const popAudio = new Audio('/assets/pop.mp3');
    void popAudio.play();
  }, [pathname]);

  return (
    <>
      <AppHead />
      <ThemeProvider attribute='class' defaultTheme='dark' enableSystem={false}>
        <Layout>
          <AnimatePresence mode='wait'>
            <Component {...pageProps} key={pathname} />
          </AnimatePresence>
        </Layout>
      </ThemeProvider>
    </>
  );
}
