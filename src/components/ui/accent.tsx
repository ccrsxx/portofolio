import type { ReactNode } from 'react';

type AccentProps = {
  children: ReactNode;
};

export function Accent({ children }: AccentProps): JSX.Element {
  return <span className='gradient-title'>{children}</span>;
}
