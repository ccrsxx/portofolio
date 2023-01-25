import { HiEye, HiClock } from 'react-icons/hi2';
import { Accent } from '@components/ui/accent';
import type { PropsWithChildren } from 'react';
import type { Blog } from '@lib/types/contents';

type BlogStatProps = PropsWithChildren<Pick<Blog, 'readTime'>>;

export function BlogStats({ readTime, children }: BlogStatProps): JSX.Element {
  return (
    <div className='flex gap-4 text-sm font-medium text-gray-600 dark:text-gray-300'>
      <div className='flex items-center gap-1'>
        <HiEye className='h-4 w-4' />
        <Accent>{readTime}</Accent>
      </div>
      <div className='flex items-center gap-1'>
        <HiClock className='h-4 w-4' />
        <Accent>{children}</Accent>
      </div>
    </div>
  );
}
