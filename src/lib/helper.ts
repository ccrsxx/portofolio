import type { SyntheticEvent } from 'react';
import type { Blog } from './types/contents';

type PreventBubblingProps = {
  preventDefault?: boolean;
  callback?: (...args: never[]) => unknown;
};

/**
 * A function that prevents the event from bubbling up the DOM tree.
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
 * Get the tags from a blog post string.
 *
 * @param contents The tags string.
 * @returns The tags array.
 */
export function getTags(contents: Blog[]): string[] {
  const validTags = contents.flatMap(({ tags }) =>
    tags.split(',').map((tag) => tag.trim())
  );

  const uniqueTags = Array.from(new Set(validTags));

  return uniqueTags;
}

/**
 * A function that returns a boolean if the target string includes the filter string.
 */
export function textIncludes(target: string, filter: string): boolean {
  const [newTarget, newFilter] = [target, filter].map((text) =>
    text.replace(/\W/g, '').toLowerCase()
  );
  return newTarget.includes(newFilter);
}
