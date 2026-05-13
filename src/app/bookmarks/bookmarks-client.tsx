'use client';

import { BookmarkCard } from '@components/bookmarks/bookmark-card';
import { BookmarkMeta } from '@components/bookmarks/bookmark-meta';
import { TagsFilter } from '@components/bookmarks/tags-filter';
import { Accent } from '@components/ui/accent';
import { getBookmarksTagsWithCount } from '@lib/helper';
import { setTransition } from '@lib/transition';
import type { Bookmark } from '@lib/types/bookmarks';
import clsx from 'clsx';
import { AnimatePresence, motion, type MotionProps } from 'motion/react';
import { useState } from 'react';

type BookmarksClientProps = {
  bookmarks: Bookmark[];
};

export function BookmarksClient({
  bookmarks
}: BookmarksClientProps): React.JSX.Element {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const bookmarksTags = getBookmarksTagsWithCount(bookmarks);

  const filteredBookmarks = selectedTags.length
    ? bookmarks.filter((b) => selectedTags.some((tag) => b.tags.includes(tag)))
    : bookmarks;

  const handleRemoveTag = (tagToRemove: string): void => {
    setSelectedTags(selectedTags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <main className='min-h-screen'>
      <header className='grid gap-2'>
        <h1 className='text-3xl font-bold md:text-5xl animate-enter-y'>
          <Accent>Bookmarks</Accent>
        </h1>
        <p className='text-secondary animate-enter-y animate-enter-delay-100'>
          A collection of artworks that I have bookmarked on Pixiv.
        </p>
      </header>
      <section className='mt-2'>
        <div className='animate-enter-y animate-enter-delay-200'>
          <TagsFilter
            tags={bookmarksTags}
            selectedTags={selectedTags}
            onSelectTags={setSelectedTags}
          />
        </div>
        <div className='mt-2 animate-enter-y animate-enter-delay-300'>
          <BookmarkMeta
            total={filteredBookmarks.length}
            selectedTags={selectedTags}
            onRemoveTag={handleRemoveTag}
          />
        </div>
      </section>
      <ul
        className={clsx(
          'mt-4 animate-enter-y animate-enter-delay-400',
          filteredBookmarks.length &&
            'columns-2 gap-4 md:columns-3 lg:columns-4'
        )}
      >
        <AnimatePresence mode='popLayout'>
          {filteredBookmarks.length ? (
            <AnimatePresence>
              {filteredBookmarks.map((bookmark) => (
                <motion.li {...variants} layout='position' key={bookmark.id}>
                  <BookmarkCard {...bookmark} selectedTags={selectedTags} />
                </motion.li>
              ))}
            </AnimatePresence>
          ) : (
            <motion.li
              className='text-center text-3xl font-bold'
              {...setTransition({ delayIn: 0.2 })}
              key='no-results'
            >
              <Accent>No artworks found for these tags.</Accent>
            </motion.li>
          )}
        </AnimatePresence>
      </ul>
    </main>
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
