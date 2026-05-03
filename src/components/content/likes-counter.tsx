import { useContentLikes, useLikeContent } from '@lib/hooks/use-content-likes';
import type { Content } from '@lib/types/contents';
import { clsx } from 'clsx';
import { motion, type MotionProps } from 'framer-motion';

const MAX_USER_LIKES = 5;
const HEART_HEIGHT_PX = 20;

export function LikesCounter({
  slug
}: Pick<Content, 'slug'>): React.JSX.Element {
  const {
    data: likeStatus,
    error: likesError,
    isPending: isLikesLoading
  } = useContentLikes(slug);

  const {
    error: likeError,
    isPending: isLiking,
    mutate: likeContent
  } = useLikeContent();

  if (likesError) {
    console.error('likes counter content like error', {
      slug,
      error: likesError
    });
  }

  if (likeError) {
    console.error('likes counter increment like error', {
      slug,
      error: likeError
    });
  }

  const { likes, userLikes } = likeStatus ?? {};

  const hasReachedLikeLimit =
    userLikes !== undefined && userLikes >= MAX_USER_LIKES;

  const isLikeButtonDisabled = !likeStatus || hasReachedLikeLimit || isLiking;

  return (
    <div
      className={clsx(
        'mt-4 flex items-center justify-center gap-4',
        isLikesLoading && 'animate-pulse'
      )}
    >
      <button
        className='clickable relative disabled:cursor-not-allowed border-0'
        onClick={() => likeContent(slug)}
        disabled={isLikeButtonDisabled}
        aria-label={
          hasReachedLikeLimit
            ? 'Maximum likes reached'
            : `Like this content (${userLikes ?? 0} of ${MAX_USER_LIKES})`
        }
      >
        <GradientHeart userLikes={userLikes ?? 0} />
      </button>
      <p
        className={clsx(
          'text-lg font-medium transition-colors',
          hasReachedLikeLimit ? 'gradient-title' : 'text-muted'
        )}
      >
        {isLikesLoading ? '...' : likes}
      </p>
    </div>
  );
}

function GradientHeart({
  userLikes
}: {
  userLikes: number;
}): React.JSX.Element {
  const hasMaxLikes = userLikes === MAX_USER_LIKES;

  // How far (in px) to push the gradient rect down — 0 when full, HEART_HEIGHT_PX when empty
  const gradientOffsetY =
    HEART_HEIGHT_PX - (userLikes / MAX_USER_LIKES) * HEART_HEIGHT_PX;

  return (
    <>
      <motion.i
        className='absolute block w-full text-center text-2xl opacity-0'
        {...(hasMaxLikes && maxLikesAnimation)}
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
            className='text-accent-foreground h-5 w-5'
          />
          <rect
            fill='url(#gradient)'
            className='h-5 w-5 transition-transform'
            style={{ transform: `translateY(${gradientOffsetY}px)` }}
          />
        </g>
      </svg>
    </>
  );
}

const maxLikesAnimation: Pick<MotionProps, 'animate'> = {
  animate: {
    opacity: [1, 1, 1, 0],
    y: -48,
    transition: { duration: 0.7 }
  }
};
