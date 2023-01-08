import type { ReactNode, ComponentPropsWithoutRef } from 'react';

type ExternalLinkProps = {
  href: string;
  children: ReactNode;
} & ComponentPropsWithoutRef<'a'>;

export function ExternalLink({
  href,
  children,
  className
}: ExternalLinkProps): JSX.Element {
  return (
    <a className={className} href={href} target='_blank' rel='noreferrer'>
      {children}
    </a>
  );
}
