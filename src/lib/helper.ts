import type { SyntheticEvent } from 'react';
import type { Bookmark } from './types/bookmarks';
import type { Blog, ContentType, PathContentType } from './types/contents';

type PreventBubblingProps = {
  preventDefault?: boolean;
  callback?: (...args: never[]) => unknown;
};

/**
 * Prevents the event from bubbling up the DOM tree.
 */
export function preventBubbling({
  preventDefault,
  callback
}: PreventBubblingProps = {}) {
  return (e: SyntheticEvent): void => {
    e.stopPropagation();

    if (preventDefault) e.preventDefault();
    if (callback) callback();
  };
}

/**
 * Returns the content without the extension.
 */
export function removeContentExtension(content: string): string {
  return content.replace(/\.mdx$/, '');
}

/**
 * Returns an array of unique tags from the contents.
 */
export function getContentTags(contents: Blog[]): string[] {
  const validTags = contents.flatMap(({ tags }) =>
    tags.split(',').map((tag) => tag.trim())
  );

  const uniqueTags = Array.from(new Set(validTags));

  return uniqueTags;
}

export type BookmarkTagWithCount = {
  tag: string;
  count: number;
};

/**
 * Returns an array of unique tags from the bookmarks.
 */
export function getBookmarksTagsWithCount(
  bookmarks: Bookmark[]
): BookmarkTagWithCount[] {
  const validTags = bookmarks.flatMap(({ tags }) => tags);

  const tagCountMap: Record<string, number> = {};

  for (const tag of validTags) {
    tagCountMap[tag] = (tagCountMap[tag] ?? 0) + 1;
  }

  const tagsWithCountSorted = Object.entries(tagCountMap)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);

  return tagsWithCountSorted;
}

/**
 * Returns the content type based on the path content type.
 */
export function convertPathContentToContentType(
  pathContentType: PathContentType
): ContentType {
  if (pathContentType === 'projects') return 'project';
  return 'blog';
}

/**
 * Returns the path content type based on the content type.
 */
export function convertContentTypeToPathContentType(
  contentType: ContentType
): PathContentType {
  if (contentType === 'project') return 'projects';
  return 'blog';
}

/**
 * Returns a boolean value indicating whether the target text includes the filter text.
 */
export function textIncludes(target: string, filter: string): boolean {
  const [newTarget, newFilter] = [target, filter].map((text) =>
    text.replace(/\W/g, '').toLowerCase()
  );
  return newTarget.includes(newFilter);
}
