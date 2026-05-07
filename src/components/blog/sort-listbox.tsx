import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions
} from '@headlessui/react';
import { clsx } from 'clsx';
import { AnimatePresence, motion, type MotionProps } from 'framer-motion';
import { Fragment, type Dispatch, type SetStateAction } from 'react';
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
        <div className='ml-auto w-52'>
          <ListboxButton
            className={clsx(
              'clickable relative w-full py-2 pr-10 pl-3 text-left text-sm',
              open && 'shadow-md'
            )}
          >
            <span className='flex items-center gap-2 truncate'>
              {sortOrder === 'date' ? (
                <HiCalendar className='text-lg' />
              ) : (
                <HiEye className='text-lg' />
              )}
              Sort by {sortOrder}
            </span>
            <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
              <HiArrowsUpDown className='text-lg text-gray-400' />
            </span>
          </ListboxButton>
          <AnimatePresence mode='wait'>
            {open && (
              <ListboxOptions as={Fragment} anchor='bottom' static>
                <motion.ul
                  className='main-border smooth-tab bg-background z-10 max-h-60 w-(--button-width) overflow-auto rounded-md text-sm shadow-lg [--anchor-gap:8px]'
                  {...variants}
                >
                  {sortOptions.map((sortOption) => (
                    <ListboxOption
                      className='hover:bg-accent-main/10 data-focus:bg-accent-main/10 cursor-pointer py-2 px-4 transition-colors select-none flex gap-2'
                      value={sortOption}
                      key={sortOption}
                    >
                      {({ selected }): React.JSX.Element => (
                        <>
                          <span className='text-accent-main flex items-center w-5 h-5'>
                            {selected && <HiCheck className='text-lg' />}
                          </span>
                          <span
                            className={clsx(
                              'block truncate',
                              selected ? 'font-medium' : 'font-normal'
                            )}
                          >
                            Sort by {sortOption}
                          </span>
                        </>
                      )}
                    </ListboxOption>
                  ))}
                </motion.ul>
              </ListboxOptions>
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
