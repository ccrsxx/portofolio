import { ViewsCounter } from '@components/contents/views-counter';
import { Accent } from '@components/ui/accent';
import type { Blog } from '@lib/types/contents';
import type { PropsForViews } from '@lib/types/helper';
import { HiClock, HiEye } from 'react-icons/hi2';

type BlogStatProps = PropsForViews<Pick<Blog, 'readTime'>>;

export function BlogStats({
  slug,
  readTime,
  increment
}: BlogStatProps): React.JSX.Element {
  return (
    <div className='text-muted flex gap-4 text-sm font-medium'>
      <div className='flex items-center gap-1'>
        <HiClock className='h-4 w-4' />
        <Accent>{readTime}</Accent>
      </div>
      <div className='flex items-center gap-1'>
        <HiEye className='h-4 w-4' />
        <Accent>
          <ViewsCounter slug={slug} increment={increment} />
        </Accent>
      </div>
    </div>
  );
}
