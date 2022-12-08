import '@styles/globals.scss';

import { Layout } from '@components/common/layout';
import { AppHead } from '@components/common/app-head';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <AppHead />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
