import { readFile, readdir } from 'fs/promises';
import { join } from 'path';
import readingTime from 'reading-time';
import { GITHUB_TOKEN } from './env';
import { getContentByFiles } from './mdx';
import type { Blog, Project, ContentType } from './types/contents';
import type { FileCommitHistory } from './types/github';

/**
 * Returns the content files within the selected content directory.
 */
export async function getContentFiles(type: ContentType): Promise<string[]> {
  const contentDirectory = join('src', 'pages', type);
  const contentPosts = await readdir(contentDirectory);

  return contentPosts;
}

/**
 * Returns the content read time.
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
 * Returns the content last updated date from the GitHub API.
 */
export async function getContentLastUpdatedDate(
  type: ContentType,
  slug: string
): Promise<string | null> {
  const response = await fetch(
    `https://api.github.com/repos/ccrsxx/portofolio/commits?path=src/pages/${type}/${slug}.mdx`,
    { headers: { Authorization: `Bearer ${GITHUB_TOKEN}` } }
  );

  const commits = (await response.json()) as FileCommitHistory[];

  const featCommits = commits.filter(({ commit: { message } }) =>
    message.startsWith('feat')
  );

  if (featCommits.length <= 1) return null;

  const {
    commit: {
      author: { date }
    }
  } = featCommits[0];

  return date;
}

/**
 * Returns three random suggested contents.
 */
export async function getSuggestedContents(
  type: ContentType
): Promise<(Blog | Project)[]> {
  const contentFiles = await getContentFiles(type);

  const shuffledFiles = contentFiles
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

  const randomShuffledFiles = shuffledFiles.slice(0, 3);

  const suggestedContents = await getContentByFiles(type, randomShuffledFiles);

  return suggestedContents;
}
