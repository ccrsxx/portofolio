import { BookmarkCard } from '@components/bookmarks/bookmark-card';
import { BookmarkMeta } from '@components/bookmarks/bookmark-meta';
import { TagsFilter } from '@components/bookmarks/tags-filter';
import { SEO } from '@components/common/seo';
import { Accent } from '@components/ui/accent';
import { getAllBookmarks } from '@lib/api';
import { getBookmarksTags } from '@lib/helper';
import { setTransition } from '@lib/transition';
import type { Bookmark } from '@lib/types/bookmarks';
import { AnimatePresence, motion, type MotionProps } from 'framer-motion';
import type { GetStaticPropsResult, InferGetStaticPropsType } from 'next';
import { useState } from 'react';

export default function Bookmarks({
  bookmarks
}: InferGetStaticPropsType<typeof getStaticProps>): React.JSX.Element {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const bookmarksTags = getBookmarksTags(bookmarks);

  const filteredBookmarks = selectedTags.length
    ? bookmarks.filter((b) => selectedTags.some((tag) => b.tags.includes(tag)))
    : bookmarks;

  const handleRemoveTag = (tagToRemove: string): void => {
    setSelectedTags(selectedTags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <main className='min-h-screen'>
      <SEO
        title='Bookmarks'
        description='A collection of artworks that I have bookmarked on Pixiv.'
      />
      <section className='grid gap-2'>
        <motion.h1
          className='text-3xl font-bold md:text-5xl'
          {...setTransition()}
        >
          <Accent>Bookmarks</Accent>
        </motion.h1>
        <motion.p
          className='text-secondary'
          {...setTransition({ delayIn: 0.1 })}
        >
          A collection of artworks that I have bookmarked on Pixiv.
        </motion.p>
      </section>
      <motion.section className='mt-2' {...setTransition({ delayIn: 0.2 })}>
        <motion.section {...setTransition({ delayIn: 0.2 })}>
          <TagsFilter
            tags={bookmarksTags}
            selectedTags={selectedTags}
            onSelectTags={setSelectedTags}
          />
        </motion.section>
        <motion.section className='mt-2' {...setTransition({ delayIn: 0.3 })}>
          <BookmarkMeta
            total={filteredBookmarks.length}
            selectedTags={selectedTags}
            onRemoveTag={handleRemoveTag}
          />
        </motion.section>
      </motion.section>
      <motion.section className='mt-4' {...setTransition({ delayIn: 0.4 })}>
        <AnimatePresence mode='popLayout'>
          {filteredBookmarks.length ? (
            <AnimatePresence>
              <ul className='columns-2 gap-4 m-0 md:columns-3 lg:columns-4 list-none p-0'>
                {filteredBookmarks.map((bookmark) => (
                  <motion.li {...variants} layout='position' key={bookmark.id}>
                    <BookmarkCard {...bookmark} selectedTags={selectedTags} />
                  </motion.li>
                ))}
              </ul>
            </AnimatePresence>
          ) : (
            <motion.h2
              className='py-12 text-center text-secondary'
              {...setTransition({ delayIn: 0.2 })}
              key='no-results'
            >
              <Accent>No artworks found for these tags.</Accent>
            </motion.h2>
          )}
        </AnimatePresence>
      </motion.section>
    </main>
  );
}

type BookmarksProps = {
  bookmarks: Bookmark[];
};

export async function getStaticProps(): Promise<
  GetStaticPropsResult<BookmarksProps>
> {
  try {
    const bookmarks = await getAllBookmarks();

    return {
      props: {
        bookmarks
      },
      revalidate: 60
    };
  } catch (error) {
    console.error('bookmarks ssr error', error);
    throw error;
  }
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
