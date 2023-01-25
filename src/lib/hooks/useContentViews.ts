import { useRef, useEffect } from 'react';
import useSWR from 'swr';
import { fetcher } from '@lib/fetcher';
import type { ValidApiEndpoints } from '@lib/types/api';
import type { Views } from '@lib/types/meta';

type ContentViews = {
  views?: Views;
  isLoading: boolean;
};

/**
 * Returns the views of the content.
 */
export function useContentViews(
  slug: string,
  { increment }: { increment?: boolean } = {}
): ContentViews {
  const {
    data: views,
    isLoading,
    mutate
  } = useSWR<Views, unknown, ValidApiEndpoints>(`/api/views/${slug}`, fetcher);

  const firstRender = useRef(true);

  useEffect(() => {
    if (!increment || !firstRender.current) return;

    const registerViews = async (): Promise<void> => {
      const views = await fetcher<Views>(`/api/views/${slug}`, {
        method: 'POST'
      });

      await mutate(views);
    };

    void registerViews();

    return () => {
      firstRender.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { views, isLoading };
}
