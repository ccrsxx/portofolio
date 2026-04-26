import type { CustomTag, ValidTag } from '@lib/types/helper';
import { clsx } from 'clsx';

const DEFAULT_TAG = 'button' as const;

export function BlogTag<T extends ValidTag = typeof DEFAULT_TAG>({
  tag = DEFAULT_TAG,
  children,
  className,
  ...rest
}: CustomTag<T>): React.JSX.Element {
  const CustomTag: ValidTag = tag;

  return (
    <CustomTag
      className={clsx(
        className,
        'bg-muted-background text-primary hover:text-foreground rounded-md px-1.5 py-0.5 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50'
      )}
      {...rest}
    >
      {children}
    </CustomTag>
  );
}
