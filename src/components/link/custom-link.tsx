import { Accent } from '@components/ui/accent';
import { UnstyledLink, type UnstyledLinkProps } from './unstyled-link';

export function CustomLink({
  children,
  ...rest
}: UnstyledLinkProps): React.JSX.Element {
  return (
    <UnstyledLink className='animated-underline with-dots' {...rest}>
      <Accent>{children}</Accent>
    </UnstyledLink>
  );
}
