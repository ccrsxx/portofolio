import cn from 'clsx';
import type { ReactNode } from 'react';

type TooltipProps = {
  tip: string | JSX.Element;
  children: ReactNode;
  className?: string;
  customTag?: keyof JSX.IntrinsicElements;
  tooltipClassName?: string;
};

export function Tooltip({
  tip,
  children,
  customTag,
  className,
  tooltipClassName
}: TooltipProps): JSX.Element | null {
  const CustomTag = customTag ?? 'div';

  return (
    <CustomTag className={cn('group relative', className)}>
      {children}
      <div
        className={cn(
          `main-border invisible absolute left-1/2 z-20 -translate-x-1/2 -translate-y-12 whitespace-nowrap 
           rounded bg-white px-2  py-1 text-sm opacity-0 [transition:visibility_0ms_ease_300ms,300ms_ease] 
           group-hover:visible group-hover:opacity-100 group-focus-visible:visible 
           group-focus-visible:opacity-100 dark:bg-background`,
          tooltipClassName ?? 'group-hover:-translate-y-16'
        )}
      >
        <span>{tip}</span>
      </div>
    </CustomTag>
  );
}
