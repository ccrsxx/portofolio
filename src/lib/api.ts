import { backendEnv } from './env-server';
import { fetcher } from './fetcher';
import {
  convertPathContentToContentType,
  removeContentExtension
} from './helper';
import { getAllContents } from './mdx';
import { getContentFiles } from './mdx-utils';
import type { AuthUser } from './types/auth';
import {
  PATH_CONTENT_TYPES,
  type Blog,
  type ContentType,
  type PathContentType
} from './types/contents';
import type { Guestbook } from './types/guestbook';
import type { ContentMeta } from './types/meta';
import type { ContentColumn, ContentStatistics } from './types/statistics';

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

export type BlogWithViews = Blog & Pick<ContentMeta, 'views'>;

/**
 * Returns all the blog posts.
 */
export async function getGuestbook(): Promise<Guestbook[]> {
  const response = await fetcher<Guestbook[]>(
    `${backendEnv.INTERNAL_BACKEND_URL}/guestbook`
  );

  return response;
}

export async function getSession(token: string): Promise<AuthUser> {
  const response = await fetcher<AuthUser>(
    `${backendEnv.INTERNAL_BACKEND_URL}/auth/me`,
    {
      headers: {
        Cookie: `oauth-token=${token}`
      }
    }
  );

  return response;
}

/**
 * Returns all the blog posts with the views.
 */
export async function getAllBlogWithViews(
  contentColumns: ContentColumn[]
): Promise<BlogWithViews[]> {
  const posts = await getAllContents('blog');

  const blogWithViews = posts.map((post) => {
    let views = 0;

    for (const column of contentColumns) {
      if (column.slug === post.slug) {
        views = column.views;
        break;
      }
    }

    return { ...post, views };
  });

  return blogWithViews;
}

/**
 * Returns the contents statistics with selected content type.
 */
export async function getContentsStatistics(
  type?: ContentType
): Promise<ContentStatistics> {
  let queryParams = '';

  if (type) {
    queryParams = `?type=${type}`;
  }

  const response = await fetcher<ContentStatistics>(
    `${backendEnv.INTERNAL_BACKEND_URL}/statistics${queryParams}`
  );

  return response;
}

/**
 * Returns the contents data with selected content type.
 */
export async function getContentsDataByType(
  type?: ContentType
): Promise<ContentColumn[]> {
  let queryParams = '';

  if (type) {
    queryParams = `?type=${type}`;
  }

  const response = await fetcher<ContentColumn[]>(
    `${backendEnv.INTERNAL_BACKEND_URL}/contents${queryParams}`
  );

  return response;
}
