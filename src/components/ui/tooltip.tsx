import { clsx } from 'clsx';
import type { ValidTag, CustomTag } from '@lib/types/helper';

type TooltipProps<T extends ValidTag> = CustomTag<T> & {
  tip: string | JSX.Element;
  tooltipClassName?: string;
};

const DEFAULT_TAG = 'div' as const;

export function Tooltip<T extends ValidTag = typeof DEFAULT_TAG>({
  tag = DEFAULT_TAG,
  tip,
  children,
  className,
  tooltipClassName = 'group-hover:-translate-y-16 peer-focus-visible:-translate-y-16',
  ...rest
}: TooltipProps<T>): JSX.Element {
  const CustomTag: ValidTag = tag;

  return (
    <CustomTag className={clsx('group relative', className)} {...rest}>
      {children}
      <div
        className={clsx(
          `main-border invisible absolute left-1/2 z-20 -translate-x-1/2 -translate-y-12 whitespace-nowrap rounded-md
           bg-white px-2 py-1 text-sm opacity-0 [transition:visibility_0ms_ease_300ms,300ms_ease] group-hover:visible 
           group-hover:opacity-100 peer-focus-visible:visible peer-focus-visible:opacity-100 dark:bg-black`,
          tooltipClassName
        )}
      >
        <span>{tip}</span>
      </div>
    </CustomTag>
  );
}
