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
      'spotify',
      null
    );

  useEffect(() => {
    const url = new URL(
      `${frontendEnv.NEXT_PUBLIC_BACKEND_URL}/spotify/currently-playing/sse`
    );

    url.searchParams.set('token', frontendEnv.NEXT_PUBLIC_OWNER_BEARER_TOKEN);

    const eventSource = new EventSource(url);

    eventSource.onmessage = (event: MessageEvent<string>): void => {
      const data = JSON.parse(
        event.data
      ) as BackendSuccessApiResponse<CurrentlyPlaying>;

      setData(data);
    };

    eventSource.onerror = (error: Event): void => {
      // eslint-disable-next-line no-console
      console.error('SSE error:', error);
    };

    return (): void => {
      eventSource.close();
    };
  }, [setData]);

  return {
    currentlyPlaying: data ?? null
  };
}
