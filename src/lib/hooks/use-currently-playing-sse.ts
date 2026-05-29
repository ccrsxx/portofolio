import { frontendEnv } from '@lib/env';
import type { BackendSuccessApiResponse } from '@lib/types/api';
import type { CurrentlyPlaying } from '@lib/types/currently-playing';
import { useEffect } from 'react';
import { useLocalStorage } from './use-local-storage';

type UseCurrentlyPlayingSSE = {
  currentlyPlaying: CurrentlyPlaying | null;
};

export type CurrentlyPlayingSSEOptions = {
  initialSpotifyData: CurrentlyPlaying | null;
  initialJellyfinData: CurrentlyPlaying | null;
};

/**
 * Get the current playing track from Spotify.
 */
export function useCurrentlyPlayingSSE({
  initialSpotifyData,
  initialJellyfinData
}: CurrentlyPlayingSSEOptions): UseCurrentlyPlayingSSE {
  const [spotifyData, setSpotifyData] =
    useLocalStorage<CurrentlyPlaying | null>(
      'spotify',
      null,
      initialSpotifyData
    );

  const [jellyfinData, setJellyfinData] =
    useLocalStorage<CurrentlyPlaying | null>(
      'jellyfin',
      null,
      initialJellyfinData
    );

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

    eventSource.addEventListener('jellyfin', (event: MessageEvent<string>) => {
      const data =
        (JSON.parse(
          event.data
        ) as BackendSuccessApiResponse<CurrentlyPlaying>) ?? null;

      setJellyfinData(data.data);
    });

    eventSource.addEventListener('error', (error) => {
      console.error('sse error', error);
    });

    return (): void => eventSource.close();
  }, [setSpotifyData, setJellyfinData]);

  let parsedData: CurrentlyPlaying | null = null;

  if (jellyfinData?.item) {
    parsedData = jellyfinData;
  } else if (spotifyData?.item) {
    parsedData = spotifyData;
  }

  // If both platform item exist, but Jellyfin is paused while Spotify is playing, switch to Spotify
  const shouldPreferSpotify =
    jellyfinData?.item &&
    spotifyData?.item &&
    !jellyfinData?.isPlaying &&
    spotifyData?.isPlaying;

  if (shouldPreferSpotify) {
    parsedData = spotifyData;
  }

  return {
    currentlyPlaying: parsedData
  };
}
