import { clsx } from 'clsx';
import { useContentLikes } from '@lib/hooks/useContentLikes';
import type { Content } from '@lib/types/contents';

export function LikesCounter({ slug }: Pick<Content, 'slug'>): JSX.Element {
  const { likes, isLoading, likesLimitReached, registerLikes } =
    useContentLikes(slug);

  const likesIsDisabled = likes === undefined || likesLimitReached;

  return (
    <div
      className={clsx(
        'mt-4 flex items-center justify-center gap-2',
        isLoading && 'animate-pulse'
      )}
    >
      <button
        className='text-gray-400 transition-transform hover:scale-110 active:scale-95 
                   disabled:cursor-not-allowed dark:text-gray-600'
        onClick={registerLikes}
        disabled={likesIsDisabled}
      >
        <svg
          stroke='currentColor'
          fill='currentColor'
          strokeWidth='0'
          viewBox='0 0 24 24'
          aria-hidden='true'
          className='h-12 w-12'
          height='1em'
          width='1em'
          xmlns='http://www.w3.org/2000/svg'
        >
          <defs>
            <linearGradient id='myGradient' gradientTransform='rotate(90)'>
              <stop offset='5%' stopColor='#60a5fa' />
              <stop offset='95%' stopColor='#86efac' />
            </linearGradient>
          </defs>
          <path
            fill={clsx(likesLimitReached && 'url(#myGradient)')}
            d='M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z'
          />
        </svg>
      </button>
      <p
        className={clsx(
          'text-lg font-medium',
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
