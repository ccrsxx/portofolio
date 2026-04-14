import { useRef, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetcher } from '@lib/fetcher';
import type { AppQueryResult } from '@lib/types/api';
import type { Views } from '@lib/types/meta';

export const viewsKeys = {
  all: ['views'] as const,
  detail: (slug: string) => [...viewsKeys.all, slug] as const
};

/**
 * Returns the views of the content.
 */
export function useContentViews(
  slug: string,
  { increment }: { increment?: boolean } = {}
): AppQueryResult<Views> {
  const queryClient = useQueryClient();

  const queryKey = viewsKeys.detail(slug);

  const query: AppQueryResult<Views> = useQuery({
    queryKey,
    queryFn: ({ signal }) => fetcher<Views>(`/api/views/${slug}`, { signal })
  });

  const firstRender = useRef(true);

  useEffect(() => {
    if (!increment || !firstRender.current) return;

    const registerViews = async (): Promise<void> => {
      try {
        const newViews = await fetcher<Views>(`/api/views/${slug}`, {
          method: 'POST'
        });

        queryClient.setQueryData<Views>(queryKey, newViews);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('content views increment error', err);
      }
    };

    void registerViews();

    return (): void => {
      firstRender.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return query;
}
