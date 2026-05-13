import '@styles/globals.css';

import { Footer } from '@components/layout/footer';
import { Header } from '@components/layout/header';
import { ThemeProvider } from '@wrksz/themes/next';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: {
    default: 'Risal Amin | Full Stack Developer',
    template: '%s | Risal Amin'
  },
  description:
    'An online portfolio and blog by Risal Amin. Showcase some of my past projects and some of my thoughts on the world of web development.',
  icons: {
    icon: '/favicon.ico'
  },
  manifest: '/site.webmanifest'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={inter.variable}>
        <ThemeProvider
          attribute='class'
          themeColor={{
            light: '#ffffff',
            dark: '#000000'
          }}
          enableSystem={false}
          defaultTheme='dark'
        >
          <Header />
          <Providers>{children}</Providers>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
