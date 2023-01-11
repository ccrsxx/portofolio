import { HiEye, HiClock } from 'react-icons/hi2';
import { formatNumber } from '@lib/format';
import { Accent } from '@components/ui/accent';
import type { Blog, InjectedMeta } from '@lib/types/contents';

type BlogStatProps = Pick<Blog, 'readTime'> & Pick<InjectedMeta, 'views'>;

export function BlogStats({ views, readTime }: BlogStatProps): JSX.Element {
  return (
    <div className='flex gap-4 text-sm font-medium text-gray-600 dark:text-gray-300'>
      <div className='flex items-center gap-1'>
        <HiEye className='h-4 w-4' />
        <Accent>{readTime}</Accent>
      </div>
      <div className='flex items-center gap-1'>
        <HiClock className='h-4 w-4' />
        <Accent>{formatNumber(views)} views</Accent>
      </div>
    </div>
  );
}
