import type { PropsWithChildren } from 'react';

export function Accent({ children }: PropsWithChildren): React.JSX.Element {
  return <span className='gradient-title'>{children}</span>;
}
