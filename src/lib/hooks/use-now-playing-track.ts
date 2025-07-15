import useSWR from 'swr';
import { fetcher } from '@lib/fetcher';
import { frontendEnv } from '@lib/env';
import type {
  ValidApiEndpoints,
  BackendSuccessApiResponse
} from '@lib/types/api';
import type { CurrentlyPlaying } from '@lib/types/spotify';

type CurrentlyPlayingTrack = {
  data?: BackendSuccessApiResponse<CurrentlyPlaying>;
  isLoading: boolean;
};

/**
 * Get the current playing track from Spotify.
 */
export function useCurrentlyPlayingTrack(): CurrentlyPlayingTrack {
  const { data, isLoading } = useSWR<
    BackendSuccessApiResponse<CurrentlyPlaying>,
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
