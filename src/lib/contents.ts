import { readdir } from 'fs/promises';
import { join } from 'path';
import { backendEnv } from './env-backend';
import {
  convertPathContentToContentType,
  removeContentExtension
} from './helper';
import { PATH_CONTENT_TYPES, type PathContentType } from './types/contents';

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
 * Initialize all blog and projects if not exists in firestore at build time.
 */
export async function initializeAllContents(): Promise<void> {
  const contentPromises = PATH_CONTENT_TYPES.map((type) =>
    initializeContents(type)
  );

  await Promise.all(contentPromises);
}

/**
 * Initialize contents with selected content type.
 */
export async function initializeContents(type: PathContentType): Promise<void> {
  const contents = await getContentFiles(type);

  const contentPromises = contents.map(async (slug) => {
    const parsedSlug = removeContentExtension(slug);

    const parsedContentType = convertPathContentToContentType(type);

    await fetch(`${backendEnv.INTERNAL_BACKEND_URL}/contents`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${backendEnv.PRIVATE_SECRET_KEY}`
      },
      body: JSON.stringify({
        slug: parsedSlug,
        type: parsedContentType
      })
    });
  });

  await Promise.all(contentPromises);
}
