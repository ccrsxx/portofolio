import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { useContentLikes } from '@lib/hooks/useContentLikes';
import type { MotionProps } from 'framer-motion';
import type { Content } from '@lib/types/contents';

export function LikesCounter({ slug }: Pick<Content, 'slug'>): JSX.Element {
  const { likeStatus, isLoading, registerLikes } = useContentLikes(slug);

  const { likes, userLikes } = likeStatus ?? {};

  const likesLimitReached = !!(userLikes !== undefined && userLikes >= 5);
  const likesIsDisabled = !likeStatus || likesLimitReached;

  return (
    <div
      className={clsx(
        'mt-4 flex items-center justify-center gap-4',
        isLoading && 'animate-pulse'
      )}
    >
      <button
        className='smooth-tab relative text-gray-400 transition-transform hover:scale-110
                   focus-visible:scale-110 active:scale-95 disabled:cursor-not-allowed dark:text-gray-600'
        onClick={registerLikes}
        disabled={likesIsDisabled}
      >
        <GradientHeart likes={userLikes ?? 0} />
      </button>
      <p
        className={clsx(
          'text-lg font-medium transition-colors',
          likesLimitReached
            ? 'gradient-title'
            : 'text-gray-400 dark:text-gray-500'
        )}
      >
        {isLoading ? '...' : likes}
      </p>
    </div>
  );
}

function GradientHeart({ likes }: { likes: number }): JSX.Element {
  return (
    <>
      <motion.i
        className='absolute block w-full text-center text-2xl opacity-0'
        {...(likes === 5 && animate)}
      >
        🥳
      </motion.i>
      <svg viewBox='0 0 20 20' className='h-12 w-12'>
        <defs>
          <linearGradient id='gradient' x2='0%' y2='100%'>
            <stop
              offset='0%'
              stopColor='currentColor'
              stopOpacity='1'
              className='text-accent-start'
            />
            <stop
              offset='100%'
              stopColor='currentColor'
              stopOpacity='1'
              className='text-accent-end'
            />
          </linearGradient>
          <clipPath
            id='clip-path'
            className='-translate-x-0.5 -translate-y-0.5'
          >
            <path d='M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z' />
          </clipPath>
        </defs>
        <g clipPath='url(#clip-path)'>
          <rect
            fill='currentColor'
            className='h-5 w-5 text-gray-400 dark:text-gray-600'
          />
          <rect
            fill='url(#gradient)'
            className='h-5 w-5 transition-transform'
            style={{ transform: `translateY(${20 - likes * 4}px)` }}
          />
        </g>
      </svg>
    </>
  );
}

const animate: Pick<MotionProps, 'animate'> = {
  animate: {
    opacity: [1, 1, 1, 0],
    y: -48,
    transition: {
      duration: 0.7
    }
  }
};
