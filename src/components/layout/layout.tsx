import { Footer } from './footer';
import { Header } from './header';
import type { PropsWithChildren } from 'react';

export function Layout({ children }: PropsWithChildren): JSX.Element {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
