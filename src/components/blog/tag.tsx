import { clsx } from 'clsx';
import type { ReactNode, HTMLAttributes } from 'react';

type TagProps = {
  tag?: keyof JSX.IntrinsicElements;
  children: ReactNode;
} & HTMLAttributes<HTMLOrSVGElement>;

export function Tag({
  tag: Tag = 'button',
  children,
  className,
  ...rest
}: TagProps): JSX.Element {
  return (
    <Tag
      className={clsx(
        className,
        `rounded-md bg-gray-100 px-1.5 py-0.5 text-sm font-medium text-gray-700 transition-colors
         hover:text-black dark:bg-gray-700 dark:text-gray-200 dark:hover:text-white`
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
