import type { PropsWithChildren } from 'react';

export function Accent({ children }: PropsWithChildren): JSX.Element {
  return <span className='gradient-title'>{children}</span>;
}
