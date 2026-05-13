import { PageTransition } from '@components/transitions/page-transition';
import { getAllBookmarks } from '@lib/api';
import { generatePageMetadata } from '@lib/metadata';
import type { Bookmark } from '@lib/types/bookmarks';
import type { Metadata } from 'next';
import { BookmarksClient } from './bookmarks-client';

export const metadata: Metadata = generatePageMetadata({
  title: 'Bookmarks',
  description: 'A collection of artworks that I have bookmarked on Pixiv.',
  pathname: '/bookmarks'
});

export const revalidate = 60;

export default async function Bookmarks(): Promise<React.JSX.Element> {
  let bookmarks: Bookmark[] = [];

  try {
    bookmarks = await getAllBookmarks();
  } catch (error) {
    console.error('bookmarks ssr error', error);
  }

  return (
    <PageTransition>
      <BookmarksClient bookmarks={bookmarks} />
    </PageTransition>
  );
}
