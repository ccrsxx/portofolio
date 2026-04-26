import { Listbox } from '@headlessui/react';
import { clsx } from 'clsx';
import { AnimatePresence, motion, type MotionProps } from 'framer-motion';
import type { Dispatch, SetStateAction } from 'react';
import { HiArrowsUpDown, HiCalendar, HiCheck, HiEye } from 'react-icons/hi2';

type SortListboxProps = {
  sortOrder: SortOption;
  onSortOrderChange: Dispatch<SetStateAction<SortOption>>;
};

export function SortListbox({
  sortOrder,
  onSortOrderChange
}: SortListboxProps): React.JSX.Element {
  return (
    <Listbox value={sortOrder} onChange={onSortOrderChange}>
      {({ open }): React.JSX.Element => (
        <div className='relative ml-auto w-52'>
          <Listbox.Button
            className={clsx(
              'clickable relative w-full py-2 pr-10 pl-3 text-left text-sm',
              open && 'shadow-md'
            )}
          >
            <span className='flex items-center gap-2 truncate'>
              {sortOrder === 'date' ? <HiCalendar /> : <HiEye />}
              Sort by {sortOrder}
            </span>
            <i className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
              <HiArrowsUpDown className='h-5 w-5 text-gray-400' />
            </i>
          </Listbox.Button>
          <AnimatePresence mode='wait'>
            {open && (
              <Listbox.Options
                as={motion.ul}
                className='main-border smooth-tab bg-background absolute z-10 mt-2 max-h-60 w-full overflow-auto rounded-md text-sm shadow-lg'
                {...variants}
                static
              >
                {sortOptions.map((sortOption) => (
                  <Listbox.Option
                    className={({ active }): string =>
                      clsx(
                        'hover:bg-accent-main/10 relative cursor-pointer py-2 pr-4 pl-10 transition-colors select-none',
                        active && 'bg-accent-main/10'
                      )
                    }
                    value={sortOption}
                    key={sortOption}
                  >
                    {({ selected }): React.JSX.Element => (
                      <>
                        <span
                          className={clsx(
                            'block truncate',
                            selected ? 'font-medium' : 'font-normal'
                          )}
                        >
                          Sort by {sortOption}
                        </span>
                        {selected && (
                          <i className='text-accent-main absolute inset-y-0 left-0 flex items-center pl-3'>
                            <HiCheck className='h-5 w-5' />
                          </i>
                        )}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            )}
          </AnimatePresence>
        </div>
      )}
    </Listbox>
  );
}

export type SortOption = (typeof sortOptions)[number];

export const sortOptions = ['date', 'views'] as const;

const variants: MotionProps = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', duration: 0.4 }
  },
  exit: { opacity: 0, y: 20, transition: { duration: 0.2 } }
};
