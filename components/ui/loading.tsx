import { clsx } from 'clsx';
import { CustomIcon } from './custom-icon';

type LoadingProps = {
  className?: string;
  iconClassName?: string;
};

export function Loading({
  className,
  iconClassName
}: LoadingProps): JSX.Element {
  return (
    <i className={clsx('flex justify-center', className ?? 'p-4')}>
      <CustomIcon
        className={clsx('text-main-accent', iconClassName ?? 'h-7 w-7')}
        iconName='SpinnerIcon'
      />
    </i>
  );
}
