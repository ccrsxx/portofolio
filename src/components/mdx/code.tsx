import type { ComponentPropsWithoutRef } from 'react';

export function Code({
  ...props
}: ComponentPropsWithoutRef<'code'>): JSX.Element {
  return <code {...props}></code>;
}
