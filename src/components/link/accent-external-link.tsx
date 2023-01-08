import { Accent } from '@components/ui/accent';
import { ExternalLink } from './external-link';
import type { ReactNode } from 'react';

type AccentExternalLinkProps = {
  href: string;
  children: ReactNode;
};

export function AccentExternalLink({
  href,
  children
}: AccentExternalLinkProps): JSX.Element {
  return (
    <ExternalLink className='animated-underline with-dots' href={href}>
      <Accent>{children}</Accent>
    </ExternalLink>
  );
}
