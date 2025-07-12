import { Footer } from './footer';
import { Header } from './header';
import type { PropsWithChildren } from 'react';

export function Layout({ children }: PropsWithChildren): React.JSX.Element {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
