import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions
} from '@headlessui/react';
import type { BookmarkTagWithCount } from '@lib/helper';
import { clsx } from 'clsx';
import { AnimatePresence, motion, type MotionProps } from 'framer-motion';
import { Fragment, useState } from 'react';
import { HiCheck, HiChevronUpDown, HiXMark } from 'react-icons/hi2';

type TagsFilterProps = {
  tags: BookmarkTagWithCount[];
  selectedTags: string[];
  onSelectTags: (tags: string[]) => void;
};

export function TagsFilter({
  tags,
  selectedTags,
  onSelectTags
}: TagsFilterProps): React.JSX.Element {
  const [query, setQuery] = useState('');

  const filteredTags =
    query === ''
      ? tags
      : tags.filter(({ tag }) =>
          tag.toLowerCase().includes(query.toLowerCase())
        );

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setQuery(e.target.value);
  };

  const handleClearSelection = (e: React.MouseEvent): void => {
    e.stopPropagation();
    onSelectTags([]);
    setQuery('');
  };

  const handleComboboxChange = (val: string[]): void => {
    onSelectTags(val);
  };

  const handleComboboxClose = (): void => {
    setQuery('');
  };

  let placeholder = 'Filter by tags...';

  if (selectedTags.length) {
    placeholder = `${placeholder} (${selectedTags.length} selected)`;
  }

  return (
    <div className='grid gap-2'>
      <Combobox
        multiple
        as='div'
        className='relative z-10'
        value={selectedTags}
        onChange={handleComboboxChange}
        onClose={handleComboboxClose}
      >
        {({ open }) => (
          <>
            <div className='relative flex items-center'>
              <ComboboxInput
                className='custom-input w-full pr-16'
                placeholder={placeholder}
                onChange={handleQueryChange}
              />
              {!!selectedTags.length && (
                <button
                  className='absolute right-8 text-muted hover:text-foreground smooth-tab'
                  onClick={handleClearSelection}
                >
                  <HiXMark className='text-lg' />
                </button>
              )}
              <ComboboxButton
                as='button'
                className='absolute right-2 text-muted hover:text-foreground smooth-tab'
              >
                <HiChevronUpDown className='text-lg' />
              </ComboboxButton>
            </div>
            <AnimatePresence mode='wait'>
              {open && (
                <ComboboxOptions as={Fragment} static>
                  <motion.ul
                    className='main-border smooth-tab bg-background absolute left-0 mt-2 max-h-64 
                               w-full overflow-auto rounded-md shadow-lg p-1 text-sm'
                    {...variants}
                  >
                    {filteredTags.length === 0 && query !== '' ? (
                      <div className='relative cursor-default select-none px-4 py-2 text-muted'>
                        Nothing found.
                      </div>
                    ) : (
                      filteredTags.map(({ tag, count }) => (
                        <ComboboxOption
                          className='data-focus:bg-accent-main/10 data-selected:text-accent-main 
                                      rounded-md px-4 py-2 transition-colors flex items-center gap-2'
                          value={tag}
                          key={tag}
                        >
                          {({ selected }) => (
                            <>
                              <span className='text-accent-main flex items-center w-5 h-5 shrink-0'>
                                {selected && <HiCheck className='text-lg' />}
                              </span>
                              <div className='flex items-center gap-1'>
                                <span
                                  className={clsx(
                                    'block truncate',
                                    selected ? 'font-medium' : 'font-normal'
                                  )}
                                >
                                  {tag}
                                </span>
                                <span className='text-xs text-muted shrink-0'>
                                  ({count})
                                </span>
                              </div>
                            </>
                          )}
                        </ComboboxOption>
                      ))
                    )}
                  </motion.ul>
                </ComboboxOptions>
              )}
            </AnimatePresence>
          </>
        )}
      </Combobox>
    </div>
  );
}

const variants: MotionProps = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0, transition: { type: 'spring', duration: 0.4 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } }
};
