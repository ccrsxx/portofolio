import useSWR from 'swr';
import { fetcher } from '@lib/fetcher';
import { frontendEnv } from '@lib/env';
import type {
  ValidApiEndpoints,
  BackendSuccessApiResponse
} from '@lib/types/api';
import type { SpotifyCurrentlyPlaying } from '@lib/types/spotify';

type CurrentlyPlaying = {
  data?: BackendSuccessApiResponse<SpotifyCurrentlyPlaying>;
  isLoading: boolean;
};

/**
 * Get the current playing track from Spotify.
 */
export function useCurrentlyPlaying(): CurrentlyPlaying {
  const { data, isLoading } = useSWR<
    BackendSuccessApiResponse<SpotifyCurrentlyPlaying>,
    unknown,
    ValidApiEndpoints
  >(
    `${frontendEnv.NEXT_PUBLIC_BACKEND_URL}/spotify/currently-playing`,
    fetcher,
    {
      refreshInterval: 5000
    }
  );

  return { data, isLoading };
}
