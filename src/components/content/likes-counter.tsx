import { HiHeart } from 'react-icons/hi2';
import type { Content } from '@lib/types/contents';

export function LikesCounter({
  slug: _slug
}: Pick<Content, 'slug'>): JSX.Element {
  return (
    <div className='mt-4 flex items-center justify-center gap-2'>
      <button
        className='text-gray-400 transition-transform hover:scale-110
                         active:scale-95 dark:text-gray-600'
      >
        <HiHeart className='h-12 w-12' />
      </button>
      <p className='text-lg text-gray-400 dark:text-gray-500'>123</p>
    </div>
  );
}
