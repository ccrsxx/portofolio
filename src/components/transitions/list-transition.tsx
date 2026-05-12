import { ViewTransition } from 'react';

type ListTransitionProps = {
  name: string;
  children: React.ReactNode;
};

export function ListTransition({
  name,
  children
}: ListTransitionProps): React.JSX.Element {
  return (
    <ViewTransition
      name={name}
      enter='fade-in'
      exit='fade-out'
      update='auto'
      default='none'
    >
      {children}
    </ViewTransition>
  );
}
