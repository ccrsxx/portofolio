import { useRef, useEffect } from 'react';
import useSWR from 'swr';
import { fetcher } from '@lib/fetcher';
import { OWNER_BEARER_TOKEN } from '@lib/env';
import type { ContentMeta } from '@lib/types/meta';
import type { ContentType } from '@lib/types/contents';

type Content = {
  data?: ContentMeta;
  isLoading: boolean;
};

/**
 * Fetches content metadata from the API. If `incrementViews` is true, it will increment the view count
 */
export function useContent(
  type: ContentType,
  slug: string,
  { incrementViews }: { incrementViews?: boolean } = {}
): Content {
  const { data, isLoading, mutate } = useSWR<ContentMeta>(
    `/api/content/${type}/${slug}`,
    fetcher
  );

  const firstRender = useRef(true);

  useEffect(() => {
    if (!incrementViews || !firstRender.current) return;

    const registerViews = async (): Promise<void> => {
      await fetch(`/api/content/${type}/${slug}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${OWNER_BEARER_TOKEN}` }
      });

      await mutate();
    };

    void registerViews();

    return () => {
      firstRender.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, isLoading };
}
