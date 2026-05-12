import { Accent } from '@components/ui/accent';
import { AnimatePresence, motion, type MotionProps } from 'motion/react';
import { HiXMark } from 'react-icons/hi2';

type BookmarkMetaProps = {
  total: number;
  selectedTags: string[];
  onRemoveTag: (tagToRemove: string) => void;
};

export function BookmarkMeta({
  total,
  selectedTags,
  onRemoveTag
}: BookmarkMetaProps): React.JSX.Element {
  return (
    <div className='flex flex-col sm:flex-row justify-between gap-2 text-secondary text-sm font-medium'>
      <p className='shrink-0'>
        Showing <Accent>{total}</Accent> {total === 1 ? 'artwork' : 'artworks'}
      </p>
      {!!selectedTags.length && (
        <ul className='flex flex-wrap items-center gap-2 sm:justify-end'>
          <AnimatePresence>
            {selectedTags.map((tag) => (
              <motion.li
                {...variants}
                layout='position'
                className='main-border bg-accent-main/10 text-accent-main flex items-center 
                           gap-1 rounded-md px-2 py-1 text-xs font-medium'
                key={tag}
              >
                <Accent>{tag}</Accent>
                <button
                  type='button'
                  onClick={() => onRemoveTag(tag)}
                  className='hover:text-foreground smooth-tab'
                >
                  <HiXMark className='text-sm' />
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}
    </div>
  );
}

const variants: MotionProps = {
  initial: {
    scale: 0.9,
    opacity: 0
  },
  animate: {
    scale: 1,
    opacity: 1
  },
  exit: {
    scale: 0.9,
    opacity: 0
  }
};
