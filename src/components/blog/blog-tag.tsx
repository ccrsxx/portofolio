import { clsx } from 'clsx';
import type { PropsWithChildren, HTMLAttributes } from 'react';

type BlogTagProps = PropsWithChildren<
  HTMLAttributes<HTMLOrSVGElement> & {
    Tag?: keyof JSX.IntrinsicElements;
    disabled?: boolean;
  }
>;

export function BlogTag({
  Tag = 'button',
  children,
  className,
  ...rest
}: BlogTagProps): JSX.Element {
  return (
    <Tag
      className={clsx(
        className,
        `rounded-md bg-gray-100 px-1.5 py-0.5 text-sm font-medium text-gray-700 transition-colors hover:text-black 
         disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-300 dark:bg-gray-700
         dark:text-gray-200 dark:hover:text-white dark:disabled:bg-gray-600 dark:disabled:text-gray-500`
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
