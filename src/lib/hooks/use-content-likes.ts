import useSWR from 'swr';
import { fetcher } from '@lib/fetcher';
import type { ValidApiEndpoints } from '@lib/types/api';
import type { LikeStatus } from '@lib/types/meta';

type ContentLikes = {
  likeStatus?: LikeStatus;
  isLoading: boolean;
  registerLikes: () => Promise<void>;
};

/**
 * Returns the likes of the content and a function to register likes.
 */
export function useContentLikes(slug: string): ContentLikes {
  const {
    data: likeStatus,
    isLoading,
    mutate
  } = useSWR<LikeStatus, unknown, ValidApiEndpoints>(
    `/api/likes/${slug}`,
    fetcher
  );

  const registerLikes = async (): Promise<void> => {
    if (!likeStatus || likeStatus.userLikes >= 5) return;

    const likes = await fetcher<LikeStatus>(`/api/likes/${slug}`, {
      method: 'POST'
    });

    await mutate(likes);
  };

  return { likeStatus, isLoading, registerLikes };
}
