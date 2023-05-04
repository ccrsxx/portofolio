import { clsx } from 'clsx';
import type { CustomTag, ValidTag } from '@lib/types/helper';

const DEFAULT_TAG = 'button' as const;

export function BlogTag<T extends ValidTag = typeof DEFAULT_TAG>({
  tag = DEFAULT_TAG,
  children,
  className,
  ...rest
}: CustomTag<T>): JSX.Element {
  const CustomTag: ValidTag = tag;

  return (
    <CustomTag
      className={clsx(
        className,
        `rounded-md bg-gray-100 px-1.5 py-0.5 text-sm font-medium text-gray-700 transition hover:text-black 
         disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-300 dark:bg-gray-700
         dark:text-gray-200 dark:hover:text-white dark:disabled:bg-gray-600 dark:disabled:text-gray-500`
      )}
      {...rest}
    >
      {children}
    </CustomTag>
  );
}
