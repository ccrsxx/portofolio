import type { PropsWithChildren } from 'react';
import { Footer } from './footer';
import { Header } from './header';

export function Layout({ children }: PropsWithChildren): React.JSX.Element {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
