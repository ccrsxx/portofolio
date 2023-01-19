import { readFile, readdir } from 'fs/promises';
import { join } from 'path';
import readingTime from 'reading-time';
import { GITHUB_TOKEN } from './env';
import { getContentByFiles } from './mdx';
import type {
  Blog,
  ContentType,
  InjectedMeta,
  BlogWithMeta,
  ProjectWithMeta
} from './types/contents';
import type { Commit } from './types/commit';

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
 * @param type The type of the content.
 * @param slug The slug of the content.
 * @returns The read time.
 */
export async function getContentReadTime(
  type: ContentType,
  slug: string
): Promise<string> {
  const contentPath = join('src', 'pages', type, `${slug}.mdx`);

  const rawContent = await readFile(contentPath, 'utf8');

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

/**
 * Get the content last updated date.
 *
 * @param type The type of the content.
 * @param slug The slug of the content.
 * @returns The last updated date or null if the content is new.
 */
export async function getContentLastUpdatedDate(
  type: ContentType,
  slug: string
): Promise<string | null> {
  const response = await fetch(
    `https://api.github.com/repos/ccrsxx/ccrsxx.me/commits?path=src/pages/${type}/${slug}.mdx`,
    { headers: { Authorization: `Bearer ${GITHUB_TOKEN}` } }
  );

  const commits = (await response.json()) as Commit[];

  const featCommits = commits.filter(({ commit: { message } }) =>
    /^feat/.test(message)
  );

  if (featCommits.length === 1) return null;

  const {
    commit: {
      author: { date }
    }
  } = featCommits[0];

  return date;
}

/**
 * Get three random suggested contents.
 *
 * @param type The type of the content.
 * @returns The suggested contents.
 */
export async function getSuggestedContents(
  type: ContentType
): Promise<(BlogWithMeta | ProjectWithMeta)[]> {
  const contentFiles = await getContentFiles(type);

  const shuffledFiles = contentFiles
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

  const randomShuffledFiles = shuffledFiles.slice(0, 3);

  const suggestedContents = await getContentByFiles(type, randomShuffledFiles);

  return suggestedContents;
}
