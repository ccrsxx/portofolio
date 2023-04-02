import { SiSpotify } from 'react-icons/si';
import { useNowPlayingTrack } from '@lib/hooks/useNowPlayingTrack';
import { LazyImage } from '@components/ui/lazy-image';
import { UnstyledLink } from '@components/link/unstyled-link';
import { Tooltip } from '@components/ui/tooltip';

export function SpotifyCard(): null | JSX.Element {
  const { track } = useNowPlayingTrack();

  if (!track?.isPlaying) return null;

  const { trackUrl, albumName, trackName, artistName, albumImageUrl } = track;

  return (
    <Tooltip
      tip='Currently playing on my Spotify'
      className='clickable'
      tooltipClassName='group-hover:!-translate-y-36 !-translate-y-32'
    >
      <UnstyledLink
        className='main-border relative flex w-72 gap-4 rounded-md p-4'
        href={trackUrl}
      >
        <LazyImage
          className='main-border rounded-md'
          title={albumName}
          src={albumImageUrl}
          alt={albumName}
          width={64}
          height={64}
        />
        <div className='grid [&>p]:truncate [&>p>span]:text-gray-700 dark:[&>p>span]:text-gray-200'>
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
        <SiSpotify className='absolute right-4 bottom-4 text-lg text-[#1ed760]' />
      </UnstyledLink>
    </Tooltip>
  );
}
