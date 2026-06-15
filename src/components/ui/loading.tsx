import { clsx } from 'clsx';
import { LuLoader } from 'react-icons/lu';

type LoadingProps = {
  className?: string;
  iconClassName?: string;
};

export function Loading({
  className = 'p-4',
  iconClassName = 'h-7 w-7'
}: LoadingProps): React.JSX.Element {
  return (
    <span className={clsx('flex justify-center', className)}>
      <LuLoader
        className={clsx('text-accent-main animate-spin', iconClassName)}
      />
    </span>
  );
}
