import { type ReactNode, ViewTransition } from 'react';

type MorphTransitionProps = {
  name: string;
  children: ReactNode;
};

export function MorphTransition({
  name,
  children
}: MorphTransitionProps): React.JSX.Element {
  return (
    <ViewTransition name={name} share='morph' default='none'>
      {children}
    </ViewTransition>
  );
}
