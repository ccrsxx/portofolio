import { formatNumber } from '@lib/format';
import { useContentViews } from '@lib/hooks/useContentViews';
import type { PropsForViews } from '@lib/types/helper';

export function ViewsCounter({ slug, increment }: PropsForViews): JSX.Element {
  const { views } = useContentViews(slug, { increment });

  return <p>{typeof views === 'number' ? formatNumber(views) : '---'} views</p>;
}
