import useSWR from 'swr';
import { fetcher } from '@lib/fetcher';
import type { ValidApiEndpoints } from '@lib/types/api';
import type { NowPlaying } from '@lib/types/spotify';

type NowPlayingTrack = {
  track?: NowPlaying;
  isLoading: boolean;
};

/**
 * Get the current playing track from Spotify.
 */
export function useNowPlayingTrack(): NowPlayingTrack {
  const { data: track, isLoading } = useSWR<
    NowPlaying,
    unknown,
    ValidApiEndpoints
  >('/api/spotify', fetcher, {
    refreshInterval: 5000
  });

  return { track, isLoading };
}
