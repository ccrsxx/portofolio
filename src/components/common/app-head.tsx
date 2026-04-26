import { Inter } from 'next/font/google';
import Head from 'next/head';

const inter = Inter({
  subsets: ['latin']
});

export function AppHead(): React.JSX.Element {
  return (
    <>
      <Head>
        <link rel='icon' href='/favicon.ico' />
        <link rel='manifest' href='/site.webmanifest' key='site-manifest' />
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
