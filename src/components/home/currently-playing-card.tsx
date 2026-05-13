'use client';

import { UnstyledLink } from '@components/link/unstyled-link';
import { LazyImage } from '@components/ui/lazy-image';
import { formatMilisecondsToPlayback } from '@lib/format';
import { useCurrentlyPlayingSSE } from '@lib/hooks/use-currently-playing-sse';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { HiPause, HiPlay } from 'react-icons/hi2';
import { SiApplemusic, SiJellyfin, SiSpotify } from 'react-icons/si';

export function CurrentlyPlayingCard(): React.ReactNode {
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [currentPlaybackTime, setCurrentPlaybackTime] = useState(0);

  const { currentlyPlaying } = useCurrentlyPlayingSSE();

  const { platform, isPlaying, item } = currentlyPlaying?.data ?? {};

  const { trackUrl, trackName, albumName, artistName, albumImageUrl } =
    item ?? {};

  useEffect(() => {
    // If there's no song, reset everything to zero and stop.
    if (!item) {
      setCurrentPlaybackTime(0);
      setProgressPercentage(0);
      return;
    }

    const { progressMs, durationMs } = item;

    let progressIntervalId: NodeJS.Timeout;

    // Correctly handles all cases after the initial render.
    if (isPlaying) {
      // STATE 1: Song is playing. Start the live-updating interval.
      const effectStartTime = Date.now();

      const updateProgress = (): void => {
        const timeElapsed = Date.now() - effectStartTime;
        const currentProgressMs = (progressMs + timeElapsed) % durationMs;

        setCurrentPlaybackTime(currentProgressMs);
        setProgressPercentage((currentProgressMs / durationMs) * 100);
      };

      updateProgress();

      progressIntervalId = setInterval(updateProgress, 1000);
    } else {
      // STATE 2: Song is paused. Set the progress once from the API data.
      setCurrentPlaybackTime(progressMs);
      setProgressPercentage((progressMs / durationMs) * 100);
    }

    return (): void => clearInterval(progressIntervalId);
  }, [isPlaying, item]); // Re-run when the song or its playing status changes.

  const defaultPlatform = <SiApplemusic className='shrink-0 text-lg' />;

  const totalDuration = item?.durationMs ?? 0;

  let platformIcon = defaultPlatform;

  if (platform === 'spotify') {
    platformIcon = <SiSpotify className='shrink-0 text-lg text-[#1ed760]' />;
  } else if (platform === 'jellyfin') {
    platformIcon = <SiJellyfin className='text-accent-main shrink-0 text-lg' />;
  }

  return (
    <UnstyledLink
      className='main-border clickable peer block w-80 rounded-md'
      href={trackUrl ?? '/'}
    >
      <div
        className={clsx(
          'grid transition-[grid-template-rows] duration-300',
          item ? 'grid-rows-[0fr]' : 'grid-rows-[1fr]'
        )}
      >
        <div className='overflow-hidden'>
          <div className='flex w-full items-center gap-4 p-4'>
            <div className='flex w-full items-center justify-between'>
              <p>No song is currently playing</p>
              {defaultPlatform}
            </div>
          </div>
        </div>
      </div>
      <div
        className={clsx(
          'grid transition-[grid-template-rows] duration-300',
          item ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        )}
      >
        <div className='overflow-hidden'>
          <div className='flex w-full items-center gap-4 p-4'>
            <div className='grid w-full gap-4'>
              <div className='flex gap-4'>
                {albumImageUrl && (
                  <div className='shrink-0'>
                    <LazyImage
                      className='main-border h-16 w-16 overflow-hidden rounded-md'
                      title={albumName}
                      src={albumImageUrl}
                      alt={albumName as string}
                      width={64}
                      height={64}
                    />
                  </div>
                )}
                <div className='flex h-full min-w-0 flex-1 flex-col justify-between'>
                  <div className='grid h-full'>
                    <div className='flex justify-between gap-2 truncate'>
                      <p
                        className='truncate text-sm font-medium'
                        title={trackName}
                      >
                        {trackName}
                      </p>
                      {platformIcon}
                    </div>
                    <div className='mt-1 flex justify-between gap-2 truncate'>
                      <p
                        className='text-muted truncate text-xs'
                        title={artistName}
                      >
                        by{' '}
                        <cite className='not-italic text-primary'>
                          {artistName}
                        </cite>
                      </p>
                      {isPlaying ? (
                        <HiPause className='shrink-0 text-lg' />
                      ) : (
                        <HiPlay className='shrink-0 text-lg' />
                      )}
                    </div>
                    <p
                      className='text-muted w-10/12 truncate text-xs'
                      title={albumName}
                    >
                      on{' '}
                      <cite className='not-italic text-primary'>
                        {albumName}
                      </cite>
                    </p>
                  </div>
                </div>
              </div>
              <div className='grid gap-1'>
                <div className='bg-border relative h-1 rounded-full'>
                  <div
                    className='gradient-background h-1 rounded-full transition-[width] duration-300'
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
                <div className='text-muted flex justify-between text-xs'>
                  <span>
                    {formatMilisecondsToPlayback(currentPlaybackTime)}
                  </span>
                  <span>{formatMilisecondsToPlayback(totalDuration)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UnstyledLink>
  );
}
