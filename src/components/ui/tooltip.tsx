import cn from 'clsx';
import type { ReactNode, ComponentPropsWithoutRef } from 'react';

type TooltipProps = {
  tip: string | JSX.Element;
  tag?: keyof JSX.IntrinsicElements;
  children: ReactNode;
  tooltipClassName?: string;
} & ComponentPropsWithoutRef<'div'>;

export function Tooltip({
  tip,
  children,
  className,
  tag: Tag = 'div',
  tooltipClassName
}: TooltipProps): JSX.Element | null {
  return (
    <Tag className={cn('group relative', className)}>
      {children}
      <div
        className={cn(
          `main-border invisible absolute left-1/2 z-20 -translate-x-1/2 -translate-y-12 whitespace-nowrap 
           rounded bg-white px-2  py-1 text-sm opacity-0 [transition:visibility_0ms_ease_300ms,300ms_ease] 
           group-hover:visible group-hover:opacity-100 group-focus-visible:visible group-focus-visible:opacity-100
           dark:bg-dark-background`,
          tooltipClassName ?? 'group-hover:-translate-y-16'
        )}
      >
        <span>{tip}</span>
      </div>
    </Tag>
  );
}
