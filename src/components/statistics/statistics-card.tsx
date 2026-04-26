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
    <article
      className='main-border grid gap-2 rounded-md p-4 text-center'
      key={type}
    >
      <h2 className='text-2xl font-bold capitalize'>{parsedType}</h2>
      <div className='grid gap-1 [&>p>span]:text-lg [&>p>span]:font-semibold'>
        <p>
          <span>{formatNumber(totalPosts)}</span> Posts
        </p>
        <p>
          <span>{formatNumber(totalViews)}</span> views
        </p>
        <p>
          <span>{formatNumber(totalLikes)}</span> likes
        </p>
      </div>
    </article>
  );
}
