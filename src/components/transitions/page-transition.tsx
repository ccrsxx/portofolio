import { ViewTransition, type ViewTransitionClass } from 'react';

type PageTransitionProps = {
  enter?: ViewTransitionClass;
  exit?: ViewTransitionClass;
  children: React.ReactNode;
};

export function PageTransition({
  enter = 'none', // default to none
  exit = 'slide-down',
  children
}: PageTransitionProps): React.JSX.Element {
  return (
    <ViewTransition enter={enter} exit={exit} default='none'>
      {children}
    </ViewTransition>
  );
}
