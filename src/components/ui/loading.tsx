import { clsx } from 'clsx';
import { ImSpinner2 } from 'react-icons/im';

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
      <ImSpinner2
        className={clsx('text-main-accent', iconClassName ?? 'h-7 w-7')}
      />
    </i>
  );
}
