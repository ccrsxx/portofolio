import Link, { type LinkProps } from 'next/link';
import type { ComponentPropsWithoutRef } from 'react';

export type UnstyledLinkProps = ComponentPropsWithoutRef<'a'> &
  Partial<LinkProps>;

export function UnstyledLink({
  href = '',
  children,
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

  return (
    <a
      href={href}
      {...(linkIsExternal && { target: '_blank', rel: 'noreferrer' })}
      {...rest}
    >
      {children}
    </a>
  );
}
