import clsx from 'clsx';
import { useState, useEffect } from 'react';
import { SiSpotify } from 'react-icons/si';
import { useMounted } from '@lib/hooks/use-mounted';
import { formatMilisecondsToPlayback } from '@lib/format';
import { useCurrentlyPlayingSSE } from '@lib/hooks/use-currently-playing-sse';
import { LazyImage } from '@components/ui/lazy-image';
import { UnstyledLink } from '@components/link/unstyled-link';

export function SpotifyCard(): React.ReactNode {
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [currentPlaybackTime, setCurrentPlaybackTime] = useState(0);

  const { currentlyPlaying } = useCurrentlyPlayingSSE();

  const mounted = useMounted();

  const { isPlaying, item } = currentlyPlaying?.data ?? {};

  const { trackUrl, trackName, albumName, artistName, albumImageUrl } =
    item ?? {};

  useEffect(() => {
    if (!isPlaying || !item) return;

    const { progressMs, durationMs } = item;

    // Record the timestamp when this item data was received.
    const lastDataUpdateTime = Date.now();

    const progressIntervalId = setInterval(() => {
      // Calculate how much time has passed since the last data update.
      const timeSinceLastUpdate = Date.now() - lastDataUpdateTime;

      // This is the total, un-looped progress of the item.
      const unloopedProgressMs = progressMs + timeSinceLastUpdate;

      // Use the modulo operator to get the actual current progress, looping if necessary.
      const currentProgressMs = unloopedProgressMs % durationMs;

      setCurrentPlaybackTime(currentProgressMs);
      setProgressPercentage((currentProgressMs / durationMs) * 100);
    }, 1000);

    // Immediately set the state based on the initial data received.
    setCurrentPlaybackTime(progressMs);
    setProgressPercentage((progressMs / durationMs) * 100);

    return (): void => clearInterval(progressIntervalId);
  }, [isPlaying, item]);

  const totalDuration = item?.durationMs ?? 0;

  if (!mounted) return null;

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
                  className='gradient-background h-1 rounded-full transition-[width] duration-300'
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <div className='flex justify-between text-xs text-gray-600 dark:text-gray-400'>
                <span>{formatMilisecondsToPlayback(currentPlaybackTime)}</span>
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
