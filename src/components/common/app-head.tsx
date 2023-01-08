import Head from 'next/head';
import { Inter } from '@next/font/google';

const inter = Inter({
  subsets: ['latin']
});

export function AppHead(): JSX.Element {
  return (
    <>
      <Head>
        <link rel='icon' href='/favicon.ico' />
        <link rel='manifest' href='/site.webmanifest' key='site-manifest' />
        <meta name='twitter:site' content='@ccrsxx' />
        <meta name='twitter:card' content='summary_large_image' />
      </Head>
      <style jsx global>
        {`
          :root {
            --font-inter: ${inter.style.fontFamily};
          }
        `}
      </style>
    </>
  );
}
