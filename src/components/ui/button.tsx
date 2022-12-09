import { clsx } from 'clsx';
import { Loading } from './loading';
import type { ComponentProps } from 'react';

type ButtonProps = ComponentProps<'button'> & {
  loading?: boolean;
};

export function Button({
  className,
  loading,
  disabled,
  children,
  ...rest
}: ButtonProps): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  const isDisabled = loading || disabled;

  return (
    <button
      className={clsx(
        'custom-button main-tab',
        loading && 'relative !text-transparent disabled:cursor-wait',
        className
      )}
      type='button'
      disabled={isDisabled}
      {...rest}
    >
      {loading && (
        <Loading
          iconClassName='h-5 w-5'
          className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
        />
      )}
      {children}
    </button>
  );
}
