import { frontendEnv } from '@lib/env-frontend';
import type { BackendSuccessApiResponse } from '@lib/types/api';
import type { CurrentlyPlaying } from '@lib/types/currently-playing';
import { useEffect, useState } from 'react';

type UseCurrentlyPlayingSSE = {
  currentlyPlaying: CurrentlyPlaying | null;
};

export type CurrentlyPlayingSSEOptions = {
  initialSpotifyData: CurrentlyPlaying | null;
  initialNavidromeData: CurrentlyPlaying | null;
};

/**
 * Get the current playing track from Spotify.
 */
export function useCurrentlyPlayingSSE({
  initialSpotifyData,
  initialNavidromeData
}: CurrentlyPlayingSSEOptions): UseCurrentlyPlayingSSE {
  const [spotifyData, setSpotifyData] = useState(initialSpotifyData);
  const [navidromeData, setNavidromeData] = useState(initialNavidromeData);

  useEffect(() => {
    const url = new URL(`${frontendEnv.NEXT_PUBLIC_BACKEND_URL}/sse`);

    url.searchParams.set('token', frontendEnv.NEXT_PUBLIC_OWNER_BEARER_TOKEN);

    const eventSource = new EventSource(url);

    eventSource.addEventListener('message', (_event: MessageEvent<string>) => {
      // TODO: do something with the generic message event
    });

    eventSource.addEventListener('spotify', (event: MessageEvent<string>) => {
      const data =
        (JSON.parse(
          event.data
        ) as BackendSuccessApiResponse<CurrentlyPlaying>) ?? null;

      setSpotifyData(data.data);
    });

    eventSource.addEventListener('navidrome', (event: MessageEvent<string>) => {
      const data =
        (JSON.parse(
          event.data
        ) as BackendSuccessApiResponse<CurrentlyPlaying>) ?? null;

      setNavidromeData(data.data);
    });

    eventSource.addEventListener('error', (error) => {
      console.error('sse error', error);
    });

    return (): void => eventSource.close();
  }, [setSpotifyData, setNavidromeData]);

  let parsedData: CurrentlyPlaying | null = null;

  if (navidromeData?.item) {
    parsedData = navidromeData;
  } else if (spotifyData?.item) {
    parsedData = spotifyData;
  }

  // If both platform item exist, but Jellyfin is paused while Spotify is playing, switch to Spotify
  const shouldPreferSpotify =
    navidromeData?.item &&
    spotifyData?.item &&
    !navidromeData?.isPlaying &&
    spotifyData?.isPlaying;

  if (shouldPreferSpotify) {
    parsedData = spotifyData;
  }

  return {
    currentlyPlaying: parsedData
  };
}
