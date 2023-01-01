import { readFile, readdir } from 'fs/promises';
import { join } from 'path';
import readingTime from 'reading-time';
import type { Blog, ContentType, InjectedMeta } from './types/contents';

/**
 * Get all the content posts.
 *
 * @param type The type of the content.
 * @returns The content posts.
 */
export async function getContentFiles(type: ContentType): Promise<string[]> {
  const contentDirectory = join('src', 'pages', type);
  const contentPosts = await readdir(contentDirectory);

  return contentPosts;
}

/**
 * Get the content read time.
 *
 * @param path The path of the content.
 * @returns The read time.
 */
export async function getContentReadTime(path: string): Promise<string> {
  const rawContent = await readFile(path, 'utf8');

  const actualContent = rawContent.split('{/* content start */}')[1].trim();

  const { text } = readingTime(actualContent);

  return text;
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
 * TODO: Get the meta from the database.
 *
 * @param _type The type of the content.
 * @param _slug The slug of the content.
 * @returns The meta object.
 */
export function getMetaFromDb(_type: ContentType, _slug: string): InjectedMeta {
  return {
    views: 12_000,
    likes: 120
  };
}
