import cn from 'clsx';
import type { PropsWithChildren, ComponentPropsWithoutRef } from 'react';

type TooltipProps = PropsWithChildren<
  ComponentPropsWithoutRef<'div'> & {
    tip: string | JSX.Element;
    tag?: keyof JSX.IntrinsicElements;
    tooltipClassName?: string;
  }
>;

export function Tooltip({
  tip,
  children,
  className,
  tag: Tag = 'div',
  tooltipClassName = 'group-hover:-translate-y-16'
}: TooltipProps): JSX.Element {
  return (
    <Tag className={cn('group relative', className)}>
      {children}
      <div
        className={cn(
          `main-border invisible absolute left-1/2 z-20 -translate-x-1/2 -translate-y-12 whitespace-nowrap
           rounded bg-white px-2 py-1 text-sm opacity-0 [transition:visibility_0ms_ease_300ms,300ms_ease] 
           group-hover:visible group-hover:opacity-100 group-focus-visible:visible group-focus-visible:opacity-100
           dark:bg-dark-background`,
          tooltipClassName
        )}
      >
        <span>{tip}</span>
      </div>
    </Tag>
  );
}
