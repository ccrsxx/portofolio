/* eslint-disable no-console */

import { useEffect } from 'react';
import { frontendEnv } from '@lib/env';
import { useLocalStorage } from './use-local-storage';
import type { BackendSuccessApiResponse } from '@lib/types/api';
import type { CurrentlyPlaying } from '@lib/types/spotify';

type UseCurrentlyPlayingSSE = {
  currentlyPlaying: BackendSuccessApiResponse<CurrentlyPlaying> | null;
};

/**
 * Get the current playing track from Spotify.
 */
export function useCurrentlyPlayingSSE(): UseCurrentlyPlayingSSE {
  const [data, setData] =
    useLocalStorage<BackendSuccessApiResponse<CurrentlyPlaying> | null>(
      'spotify-data',
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

      setData(data);
    });

    eventSource.addEventListener('error', (error: Event) => {
      console.error('Failed to connect to SSE', error);
    });

    return (): void => eventSource.close();
  }, [setData]);

  return {
    currentlyPlaying: data ?? null
  };
}
