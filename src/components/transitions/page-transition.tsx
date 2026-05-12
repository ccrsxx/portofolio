import { ViewTransition } from 'react';

export function PageTransition({
  children
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <ViewTransition enter='slide-up' exit='slide-down' default='none'>
      {children}
    </ViewTransition>
  );
}
