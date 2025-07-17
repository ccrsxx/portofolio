import clsx from 'clsx';
import { useState, useEffect } from 'react';
import { SiSpotify } from 'react-icons/si';
import { useMounted } from '@lib/hooks/use-mounted';
import { useLanyard } from '@lib/hooks/use-lanyard';
import { formatMilisecondsToPlayback } from '@lib/format';
import { LazyImage } from '@components/ui/lazy-image';
import { UnstyledLink } from '@components/link/unstyled-link';
import type { Types } from '@prequist/lanyard';
import type { CurrentlyPlaying } from '@lib/types/spotify';

export function SpotifyCard(): React.ReactNode {
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const lanyardData = useLanyard('414304208649453568');
  const parsedLanyardData = parseLanyardToCurrentlyPlaying(lanyardData);

  const mounted = useMounted();

  const { isPlaying, item } = parsedLanyardData ?? {};
  const {
    trackUrl,
    trackName,
    albumName,
    artistName,
    timestamps,
    albumImageUrl
  } = item ?? {};

  useEffect(() => {
    if (!isPlaying || !timestamps) return;

    const { start, end } = timestamps;

    // Set up an interval to update the current time and progress percentage
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const total = end - start;

      // Stop the interval if the song has finished
      if (elapsed > total) {
        clearInterval(interval);
        return;
      }

      setCurrentTime(elapsed);
      setProgress((elapsed / total) * 100);
    }, 1000);

    // Set initial time immediately without waiting for the first interval
    const initialElapsed = Date.now() - start;
    const initialTotal = end - start;

    setCurrentTime(initialElapsed);
    setProgress((initialElapsed / initialTotal) * 100);

    return (): void => clearInterval(interval);
  }, [isPlaying, timestamps]);

  if (!mounted) return null;

  const totalDuration = timestamps ? timestamps.end - timestamps.start : 0;

  const spotifyIcon = <SiSpotify className='shrink-0 text-lg text-[#1ed760]' />;

  return (
    <div
      className={clsx(
        'max-h-20 transition-[max-height] duration-300',
        isPlaying && 'max-h-40'
      )}
    >
      <UnstyledLink
        className='main-border clickable peer flex w-80 items-center gap-4 rounded-md p-4 '
        href={trackUrl ?? '/'}
      >
        {isPlaying ? (
          <div className='grid w-full gap-4'>
            <div className='flex gap-4'>
              {albumImageUrl && (
                <div className='flex-shrink-0'>
                  <LazyImage
                    className='main-border h-1w-16 w-16 rounded-md'
                    title={albumName}
                    src={albumImageUrl}
                    alt={albumName as string}
                    width={64}
                    height={64}
                  />
                </div>
              )}
              <div className='flex h-full min-w-0 flex-1 flex-col justify-between'>
                <div className='grid h-full [&>p>span]:text-gray-700 dark:[&>p>span]:text-gray-200'>
                  <div className='flex justify-between gap-2 truncate'>
                    <p
                      className='truncate text-sm font-medium'
                      title={trackName}
                    >
                      {trackName}
                    </p>
                    {spotifyIcon}
                  </div>
                  <p
                    className='truncate text-xs text-gray-600 dark:text-gray-300'
                    title={artistName}
                  >
                    by <span>{artistName}</span>
                  </p>
                  <p
                    className='w-10/12 truncate text-xs text-gray-600 dark:text-gray-300'
                    title={albumName}
                  >
                    on <span>{albumName}</span>
                  </p>
                </div>
              </div>
            </div>
            <div className='grid gap-1'>
              <div className='relative h-1 rounded-full bg-gray-300 dark:bg-gray-600'>
                <div
                  className='gradient-background absolute h-1 rounded-full'
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className='flex justify-between text-xs text-gray-600 dark:text-gray-400'>
                <span>{formatMilisecondsToPlayback(currentTime)}</span>
                <span>{formatMilisecondsToPlayback(totalDuration)}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className='flex w-full items-center justify-between'>
            <p>No song is currently playing</p>
            {spotifyIcon}
          </div>
        )}
      </UnstyledLink>
    </div>
  );
}

function parseLanyardToCurrentlyPlaying(
  presence: Types.Presence | null
): CurrentlyPlaying | null {
  const spotify = presence?.spotify;

  if (!spotify) return null;

  return {
    isPlaying: presence.listening_to_spotify,
    item: {
      trackUrl: `https://open.spotify.com/track/${spotify.track_id}`,
      trackName: spotify.song,
      albumName: spotify.album ?? '',
      artistName: spotify.artist ?? '',
      timestamps: spotify.timestamps,
      albumImageUrl: spotify.album_art_url
    }
  };
}
