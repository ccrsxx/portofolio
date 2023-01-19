import type { Blog } from './types/contents';

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
 *
 * @param target target string
 * @param filter filter string
 * @returns Returns boolean if the target string includes the filter string.
 */
export function textIncludes(target: string | null, filter: string): boolean {
  if (!target) return false;
  const [newTarget, newFilter] = [target, filter].map((text) =>
    text.replace(/\W/g, '').toLowerCase()
  );
  return newTarget.includes(newFilter);
}
