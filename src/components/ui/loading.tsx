import { clsx } from 'clsx';
import { ImSpinner2 } from 'react-icons/im';

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
      <ImSpinner2
        className={clsx('animate-spin text-accent-blue', iconClassName)}
      />
    </i>
  );
}
