import { AnimatePresence, motion } from 'framer-motion';
import { SiSpotify } from 'react-icons/si';
import { useCurrentlyPlayingTrack } from '@lib/hooks/use-currently-playing-track';
import { setTransition } from '@lib/transition';
import { LazyImage } from '@components/ui/lazy-image';
import { UnstyledLink } from '@components/link/unstyled-link';
import { Tooltip } from '@components/ui/tooltip';

export function SpotifyCard(): React.JSX.Element {
  const { data } = useCurrentlyPlayingTrack();

  const currentlyPlaying = data?.data ?? null;

  const { isPlaying } = currentlyPlaying ?? {};

  const { trackUrl, trackName, albumName, artistName, albumImageUrl } =
    currentlyPlaying?.item ?? {};

  return (
    <AnimatePresence>
      {isPlaying && (
        <motion.div {...setTransition()}>
          <Tooltip
            tip='Currently playing on my Spotify'
            tooltipClassName='!-translate-y-32 group-hover:!-translate-y-36 peer-focus-visible:!-translate-y-36'
          >
            <UnstyledLink
              className='clickable main-border peer relative flex w-72 gap-4 rounded-md p-4'
              href={trackUrl ?? '/'}
            >
              {albumImageUrl && (
                <LazyImage
                  className='main-border w-16 h-16 rounded-md'
                  title={albumName}
                  src={albumImageUrl}
                  alt={albumName as string}
                  width={64}
                  height={64}
                />
              )}
              <div className='grid [&>p>span]:text-gray-700 dark:[&>p>span]:text-gray-200 [&>p]:truncate'>
                <p className='text-sm font-medium' title={trackName}>
                  {trackName}
                </p>
                <p
                  className='text-xs text-gray-600 dark:text-gray-300'
                  title={artistName}
                >
                  by <span>{artistName}</span>
                </p>
                <p
                  className='w-10/12 text-xs text-gray-600 dark:text-gray-300'
                  title={albumName}
                >
                  on <span>{albumName}</span>
                </p>
              </div>
              <SiSpotify className='absolute bottom-4 right-4 text-lg text-[#1ed760]' />
            </UnstyledLink>
          </Tooltip>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
