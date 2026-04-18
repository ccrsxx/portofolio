import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetcher } from '@lib/fetcher';
import { frontendEnv } from '@lib/env';
import type { AppQueryResult, AppMutationResult } from '@lib/types/api';
import type { LikeStatus } from '@lib/types/meta';

export const likesKeys = {
  all: ['likes'] as const,
  detail: (slug: string) => [...likesKeys.all, slug] as const
};

/**
 * Returns the likes of the content.
 */
export function useContentLikes(slug: string): AppQueryResult<LikeStatus> {
  return useQuery({
    queryKey: likesKeys.detail(slug),
    queryFn: ({ signal }) =>
      fetcher<LikeStatus>(
        `${frontendEnv.NEXT_PUBLIC_BACKEND_URL}/likes/${slug}`,
        { signal }
      )
  });
}

/**
 * Register a like for the content.
 */
export function useLikeContent(): AppMutationResult<LikeStatus, string> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (slug: string) =>
      fetcher<LikeStatus>(
        `${frontendEnv.NEXT_PUBLIC_BACKEND_URL}/likes/${slug}`,
        {
          method: 'POST'
        }
      ),
    onSuccess: (newLikeStatus, slug) => {
      queryClient.setQueryData<LikeStatus>(
        likesKeys.detail(slug),
        newLikeStatus
      );
    }
  });
}
