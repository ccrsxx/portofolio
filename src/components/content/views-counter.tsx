import { formatNumber } from '@lib/format';
import { useContentViews } from '@lib/hooks/use-content-views';
import type { PropsForViews } from '@lib/types/helper';

export function ViewsCounter({
  slug,
  increment
}: PropsForViews): React.JSX.Element {
  const { data, isPending, error } = useContentViews(slug, { increment });

  if (isPending) return <p>---</p>;

  if (error) {
    console.error('views counter error', error);
    return <p>---</p>;
  }

  return <p>{formatNumber(data.views)} views</p>;
}
