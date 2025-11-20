import { useEffect } from 'react';
import { frontendEnv } from '@lib/env';
import { useLocalStorage } from './use-local-storage';
import type { BackendSuccessApiResponse } from '@lib/types/api';
import type { CurrentlyPlaying } from '@lib/types/currently-playing';

type UseCurrentlyPlayingSSE = {
  currentlyPlaying: BackendSuccessApiResponse<CurrentlyPlaying> | null;
};

/**
 * Get the current playing track from Spotify.
 */
export function useCurrentlyPlayingSSE(): UseCurrentlyPlayingSSE {
  const [spotifyData, setSpotifyData] =
    useLocalStorage<BackendSuccessApiResponse<CurrentlyPlaying> | null>(
      'spotify',
      null
    );

  const [jellyfinData, setJellyfinData] =
    useLocalStorage<BackendSuccessApiResponse<CurrentlyPlaying> | null>(
      'jellyfin',
      null
    );

  useEffect(() => {
    const url = new URL(`${frontendEnv.NEXT_PUBLIC_BACKEND_URL}/sse`);

    url.searchParams.set('token', frontendEnv.NEXT_PUBLIC_OWNER_BEARER_TOKEN);

    const eventSource = new EventSource(url);

    eventSource.addEventListener('message', (_event: MessageEvent<string>) => {
      // TODO: do something with the generic message event
    });

    eventSource.addEventListener('spotify', (event: MessageEvent<string>) => {
      const data = JSON.parse(
        event.data
      ) as BackendSuccessApiResponse<CurrentlyPlaying>;

      setSpotifyData(data);
    });

    eventSource.addEventListener('jellyfin', (event: MessageEvent<string>) => {
      const data = JSON.parse(
        event.data
      ) as BackendSuccessApiResponse<CurrentlyPlaying>;

      setJellyfinData(data);
    });

    eventSource.addEventListener('error', (error: Event) => {
      // eslint-disable-next-line no-console
      console.error('Failed to connect to SSE', error);
    });

    return (): void => eventSource.close();
  }, [setSpotifyData, setJellyfinData]);

  let parsedData: BackendSuccessApiResponse<CurrentlyPlaying> | null = null;

  if (jellyfinData?.data?.item) {
    parsedData = jellyfinData;
  } else if (spotifyData?.data?.item) {
    parsedData = spotifyData;
  }

  // If both platform item exist, but Jellyfin is paused while Spotify is playing, switch to Spotify
  const shouldPreferSpotify =
    jellyfinData?.data?.item &&
    spotifyData?.data?.item &&
    !jellyfinData?.data?.isPlaying &&
    spotifyData?.data?.isPlaying;

  if (shouldPreferSpotify) {
    parsedData = spotifyData;
  }

  return {
    currentlyPlaying: parsedData
  };
}
