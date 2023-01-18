import { Accent } from '@components/ui/accent';
import { UnstyledLink } from './unstyled-link';
import type { UnstyledLinkProps } from './unstyled-link';

export function CustomLink({
  children,
  ...rest
}: UnstyledLinkProps): JSX.Element {
  return (
    <UnstyledLink className='animated-underline with-dots' {...rest}>
      <Accent>{children}</Accent>
    </UnstyledLink>
  );
}
