import { clsx } from 'clsx';
import { LuCircleAlert, LuCircleCheck, LuInfo } from 'react-icons/lu';

type AlertProps = {
  variant: 'info' | 'error' | 'success';
  message: string | React.JSX.Element;
  className?: string;
};

export function Alert({
  variant,
  message,
  className
}: AlertProps): React.JSX.Element {
  return (
    <div className={clsx('flex items-center gap-2', className)}>
      <div className='shrink-0'>
        {variant === 'error' ? (
          <LuCircleAlert className='text-lg text-alert-error' />
        ) : variant === 'success' ? (
          <LuCircleCheck className='text-lg text-alert-success' />
        ) : (
          <LuInfo className='text-lg text-alert-info' />
        )}
      </div>
      <p className='text-sm text-primary/80'>{message}</p>
    </div>
  );
}
