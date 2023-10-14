import { clsx } from 'clsx';
import { ImSpinner8 } from 'react-icons/im';

type LoadingProps = {
  className?: string;
  iconClassName?: string;
};

export function Loading({
  className = 'p-4',
  iconClassName = 'h-7 w-7'
}: LoadingProps): JSX.Element {
  return (
    <i className={clsx('flex justify-center', className)}>
      <ImSpinner8
        className={clsx('animate-spin text-accent-main', iconClassName)}
      />
    </i>
  );
}
