'use client';

import { BookmarkCard } from '@components/bookmarks/bookmark-card';
import { BookmarkMeta } from '@components/bookmarks/bookmark-meta';
import { TagsFilter } from '@components/bookmarks/tags-filter';
import { ListTransition } from '@components/transitions/list-transition';
import { Accent } from '@components/ui/accent';
import { getBookmarksTagsWithCount } from '@lib/helper';
import type { Bookmark } from '@lib/types/bookmarks';
import clsx from 'clsx';
import { startTransition, useState } from 'react';

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
    startTransition(() =>
      setSelectedTags(selectedTags.filter((tag) => tag !== tagToRemove))
    );
  };

  return (
    <main className='min-h-screen'>
      <header className='grid gap-2'>
        <h1 className='text-3xl font-bold md:text-5xl'>
          <Accent>Bookmarks</Accent>
        </h1>
        <p className='text-secondary'>
          A collection of artworks that I have bookmarked on Pixiv.
        </p>
      </header>
      <section className='mt-2'>
        <div>
          <TagsFilter
            tags={bookmarksTags}
            selectedTags={selectedTags}
            onSelectTags={setSelectedTags}
          />
        </div>
        <div className='mt-2'>
          <BookmarkMeta
            total={filteredBookmarks.length}
            selectedTags={selectedTags}
            onRemoveTag={handleRemoveTag}
          />
        </div>
      </section>
      <ul
        className={clsx(
          'mt-4',
          filteredBookmarks.length &&
            'columns-2 gap-4 md:columns-3 lg:columns-4'
        )}
      >
        {filteredBookmarks.length ? (
          filteredBookmarks.map((bookmark) => (
            <ListTransition
              name={`bookmark-card-${bookmark.id}`}
              key={bookmark.id}
            >
              <li>
                <BookmarkCard {...bookmark} selectedTags={selectedTags} />
              </li>
            </ListTransition>
          ))
        ) : (
          <li className='text-center text-3xl font-bold'>
            <Accent>No artworks found for these tags.</Accent>
          </li>
        )}
      </ul>
    </main>
  );
}
