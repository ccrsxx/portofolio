import type { CustomTag, ValidTag } from '@lib/types/helper';
import { clsx } from 'clsx';

type TooltipProps<T extends ValidTag> = CustomTag<T> & {
  tip: string | React.JSX.Element;
  tooltipClassName?: string;
};

const DEFAULT_TAG = 'div' as const;

export function Tooltip<T extends ValidTag = typeof DEFAULT_TAG>({
  tag = DEFAULT_TAG,
  tip,
  children,
  className,
  tooltipClassName,
  ...rest
}: TooltipProps<T>): React.JSX.Element {
  const CustomTag: ValidTag = tag;

  return (
    <CustomTag
      className={clsx(
        'group [anchor-name:--tooltip] [anchor-scope:--tooltip]',
        className
      )}
      {...rest}
    >
      {children}
      <div
        className={clsx(
          `[transition:visibility_0ms_ease_300ms,300ms_ease] [position-anchor:--tooltip] [position-area:top] [position-try-fallbacks:flip-block]
           main-border bg-background invisible absolute z-20 rounded-md px-2 py-1 text-sm opacity-0 mb-2 translate-y-2 group-hover:translate-y-0
           group-hover:visible group-hover:opacity-100 peer-focus-visible:translate-y-0 peer-focus-visible:visible peer-focus-visible:opacity-100`,
          tooltipClassName
        )}
      >
        <span>{tip}</span>
      </div>
    </CustomTag>
  );
}
