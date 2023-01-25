import type { SyntheticEvent } from 'react';
import type { Blog } from './types/contents';

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
export function getTags(contents: Blog[]): string[] {
  const validTags = contents.flatMap(({ tags }) =>
    tags.split(',').map((tag) => tag.trim())
  );

  const uniqueTags = Array.from(new Set(validTags));

  return uniqueTags;
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
