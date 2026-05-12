import { readFile, readdir } from 'fs/promises';
import { join } from 'path';
import readingTime from 'reading-time';
import { backendEnv } from './env-server';
import { getContentByFiles } from './mdx';
import type { Blog, PathContentType, Project } from './types/contents';
import type { FileCommitHistory } from './types/github';

/**
 * Returns the content files within the selected content directory.
 */
export async function getContentFiles(
  type: PathContentType,
  ignoreFiles?: string[]
): Promise<string[]> {
  const contentDirectory = join('src', 'contents', type);

  let allFiles = await readdir(contentDirectory);

  if (ignoreFiles) {
    allFiles = allFiles.filter(
      (file) => !ignoreFiles.some((ignore) => file.startsWith(ignore))
    );
  }

  const contentPosts = allFiles.filter((file) => file.endsWith('.mdx'));

  return contentPosts;
}

/**
 * Returns the content read time.
 */
export async function getContentReadTime(
  type: PathContentType,
  slug: string
): Promise<string> {
  const contentPath = join('src', 'contents', type, `${slug}.mdx`);

  const fileContent = await readFile(contentPath, 'utf8');

  const { text } = readingTime(fileContent);

  return text;
}

/**
 * Returns the content last updated date from the GitHub API.
 */
export async function getContentLastUpdatedDate(
  type: PathContentType,
  slug: string
): Promise<string | null> {
  const response = await fetch(
    `https://api.github.com/repos/ccrsxx/portofolio/commits?path=src/pages/${type}/${slug}.mdx`,
    { headers: { Authorization: `Bearer ${backendEnv.GH_TOKEN}` } }
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
  type: PathContentType,
  ignoreFiles?: string[]
): Promise<(Blog | Project)[]> {
  const contentFiles = await getContentFiles(type, ignoreFiles);

  const shuffledFiles = contentFiles
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

  const randomShuffledFiles = shuffledFiles.slice(0, 3);

  const suggestedContents = await getContentByFiles(type, randomShuffledFiles);

  return suggestedContents;
}
