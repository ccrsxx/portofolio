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
              {sortOrder === 'date' ? <HiCalendar /> : <HiEye />}
              Sort by {sortOrder}
            </span>
            <i className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
              <HiArrowsUpDown className='h-5 w-5 text-gray-400' />
            </i>
          </ListboxButton>
          <AnimatePresence mode='wait'>
            {open && (
              <ListboxOptions as={Fragment} anchor='bottom end' static>
                <motion.ul
                  className='main-border smooth-tab bg-background z-10 max-h-60 w-52 overflow-auto rounded-md text-sm shadow-lg [--anchor-gap:8px]'
                  {...variants}
                >
                  {sortOptions.map((sortOption) => (
                    <ListboxOption
                      className='hover:bg-accent-main/10 data-focus:bg-accent-main/10 relative cursor-pointer py-2 pr-4 pl-10 transition-colors select-none'
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
