import Link, { type LinkProps } from 'next/link';
import type { ComponentPropsWithoutRef } from 'react';

export type UnstyledLinkProps = ComponentPropsWithoutRef<'a'> &
  Partial<LinkProps> & {
    openInCurrentWindow?: boolean;
  };

export function UnstyledLink({
  href = '',
  children,
  openInCurrentWindow,
  ...rest
}: UnstyledLinkProps): React.JSX.Element {
  const openInNewTab = !href.startsWith('/');

  if (!openInNewTab)
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    );

  const linkIsExternal = href.startsWith('http');

  const shouldOpenInNewTab = openInCurrentWindow ? false : linkIsExternal;

  return (
    <a
      href={href}
      {...(shouldOpenInNewTab && { target: '_blank', rel: 'noreferrer' })}
      {...rest}
    >
      {children}
    </a>
  );
}
