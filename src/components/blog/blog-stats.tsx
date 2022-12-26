import { clsx } from 'clsx';
import { formatNumber } from '@lib/format';
import { ReactIcon } from '@components/ui/react-icon';
import type { ComponentPropsWithoutRef } from 'react';
import type { Blog, InjectedMeta } from '@lib/types/contents';

type BlogStatProps = Pick<Blog, 'readTime'> &
  Pick<InjectedMeta, 'views'> &
  ComponentPropsWithoutRef<'div'>;

export function BlogStats({
  views,
  readTime,
  className
}: BlogStatProps): JSX.Element {
  return (
    <div className={clsx('flex gap-4 text-sm', className)}>
      <div className='flex items-center gap-1'>
        <ReactIcon
          className='h-4 w-4 text-gray-600 dark:text-gray-300'
          iconName='HiClock'
        />
        <p className='gradient-title'>{readTime}</p>
      </div>
      <div className='flex items-center gap-1'>
        <ReactIcon
          className='h-4 w-4 text-gray-600 dark:text-gray-300'
          iconName='HiEye'
        />
        <p className='gradient-title'>{formatNumber(views)} views</p>
      </div>
    </div>
  );
}
