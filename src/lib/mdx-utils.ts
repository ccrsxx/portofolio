import { readFile } from 'fs/promises';
import { join } from 'path';
import readingTime from 'reading-time';
import { backendEnv } from './env-server';
import type { PathContentType } from './types/contents';
import type { FileCommitHistory } from './types/github';

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
