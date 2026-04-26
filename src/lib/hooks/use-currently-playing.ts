import { frontendEnv } from '@lib/env';
import { fetcher } from '@lib/fetcher';
import type { AppQueryResult, BackendSuccessApiResponse } from '@lib/types/api';
import type { CurrentlyPlaying } from '@lib/types/currently-playing';
import { useQuery } from '@tanstack/react-query';

export const spotifyKeys = {
  currentlyPlaying: ['spotify', 'currently-playing'] as const
};

/**
 * Get the current playing track from Spotify.
 */
export function useCurrentlyPlaying(): AppQueryResult<
  BackendSuccessApiResponse<CurrentlyPlaying>
> {
  return useQuery({
    queryKey: spotifyKeys.currentlyPlaying,
    queryFn: ({ signal }) =>
      fetcher<BackendSuccessApiResponse<CurrentlyPlaying>>(
        `${frontendEnv.NEXT_PUBLIC_BACKEND_URL}/spotify/currently-playing`,
        { signal }
      ),
    refetchInterval: 5000
  });
}
