import { formatNumber } from '@lib/format';
import { convertContentTypeToPathContentType } from '@lib/helper';
import type { ContentStatistics } from '@lib/types/statistics';

export function StatisticsCard({
  type,
  totalPosts,
  totalViews,
  totalLikes
}: ContentStatistics): React.JSX.Element {
  const parsedType = convertContentTypeToPathContentType(type);

  return (
    <li className='main-border grid gap-2 rounded-md p-4 text-center'>
      <p className='text-2xl font-bold capitalize'>{parsedType}</p>
      <ul className='grid gap-1 [&>p>span]:text-lg [&>p>span]:font-semibold'>
        <li>
          <span>{formatNumber(totalPosts)}</span> Posts
        </li>
        <li>
          <span>{formatNumber(totalViews)}</span> views
        </li>
        <li>
          <span>{formatNumber(totalLikes)}</span> likes
        </li>
      </ul>
    </li>
  );
}
