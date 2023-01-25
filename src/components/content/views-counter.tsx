import { formatNumber } from '@lib/format';
import { useContent } from '@lib/hooks/useContent';
import type { Content, ContentType } from '@lib/types/contents';

type ViewsCounterProps = Pick<Content, 'slug'> & {
  type: ContentType;
  incrementViews?: boolean;
};

export function ViewsCounter({
  type,
  slug,
  incrementViews
}: ViewsCounterProps): JSX.Element {
  const { data } = useContent(type, slug, { incrementViews });
  const views = data?.views;

  return <p>{views ? formatNumber(views) : '---'} views</p>;
}
