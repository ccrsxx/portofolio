import { frontendEnv } from './env';
import { backendEnv } from './env-server';
import { fetcher } from './fetcher';
import { getAllContents } from './mdx';
import type { AuthUser } from './types/auth';
import type { Bookmark } from './types/bookmarks';
import { type Blog, type ContentType } from './types/contents';
import type { CurrentlyPlaying, Platform } from './types/currently-playing';
import type { Guestbook } from './types/guestbook';
import type { ContentMeta } from './types/meta';
import type { ContentColumn, ContentStatistics } from './types/statistics';

export type BlogWithViews = Blog & Pick<ContentMeta, 'views'>;

export async function getGuestbook(): Promise<Guestbook[]> {
  const response = await fetcher<Guestbook[]>(
    `${backendEnv.INTERNAL_BACKEND_URL}/guestbook`
  );

  return response;
}

export async function getAllBookmarks(): Promise<Bookmark[]> {
  const response = await fetcher<Bookmark[]>(
    `${backendEnv.INTERNAL_BACKEND_URL}/pixiv/bookmarks/all`,
    {
      headers: {
        Authorization: `Bearer ${backendEnv.PRIVATE_SECRET_KEY}`
      }
    }
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

/**
 * Returns the currently playing track from Spotify or Jellyfin.
 */
export async function getCurrentlyPlayingByType(
  type: Platform
): Promise<CurrentlyPlaying> {
  const response = await fetcher<CurrentlyPlaying>(
    `${backendEnv.INTERNAL_BACKEND_URL}/${type}/currently-playing`,
    {
      headers: {
        Authorization: `Bearer ${frontendEnv.NEXT_PUBLIC_OWNER_BEARER_TOKEN}`
      }
    }
  );

  return response;
}
