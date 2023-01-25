import useSWR from 'swr';
import { fetcher } from '@lib/fetcher';
import type { ValidApiEndpoints } from '@lib/types/api';
import type { Likes, LikeStatus } from '@lib/types/meta';

type ContentLikes = {
  likes?: Likes;
  isLoading: boolean;
  likesLimitReached: boolean;
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

  const { likes } = likeStatus ?? {};

  const likesLimitReached = !!(likeStatus && likeStatus.userLikes >= 5);

  const registerLikes = async (): Promise<void> => {
    if (likesLimitReached) return;

    const likes = await fetcher<LikeStatus>(`/api/likes/${slug}`, {
      method: 'POST'
    });

    await mutate(likes);
  };

  return { likes, likesLimitReached, isLoading, registerLikes };
}
