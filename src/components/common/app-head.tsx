import Head from 'next/head';

export function AppHead(): JSX.Element {
  return (
    <Head>
      <title>Next.js Template</title>
      <meta name='og:title' content='Next.js Template' />
      <link rel='icon' href='/favicon.ico' />
      <link rel='manifest' href='/site.webmanifest' key='site-manifest' />
      <meta name='twitter:site' content='@ccrsxx' />
      <meta name='twitter:card' content='summary_large_image' />
    </Head>
  );
}
