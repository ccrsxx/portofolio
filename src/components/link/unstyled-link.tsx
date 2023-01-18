import Link from 'next/link';
import type { ComponentPropsWithoutRef } from 'react';
import type { LinkProps } from 'next/link';

export type UnstyledLinkProps = ComponentPropsWithoutRef<'a'> &
  Partial<LinkProps>;

export function UnstyledLink({
  href = '',
  children,
  ...rest
}: UnstyledLinkProps): JSX.Element {
  const openInNewTab = !/^\//.test(href);

  if (!openInNewTab)
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    );

  const linkIsExternal = /^http/.test(href);

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
