import { createTransport } from 'nodemailer';
import { doc, query, getDoc, getDocs, orderBy } from 'firebase/firestore';
import {
  contentsCollection,
  guestbookCollection
} from './firebase/collections';
import { backendEnv } from './env-server';
import { getAllContents } from './mdx';
import { getContentFiles } from './mdx-utils';
import {
  convertPathContentToContentType,
  removeContentExtension
} from './helper';
import {
  PATH_CONTENT_TYPES,
  type Blog,
  type ContentType,
  type PathContentType
} from './types/contents';
import { frontendEnv } from './env';
import type { Guestbook } from './types/guestbook';
import type { ContentMeta } from './types/meta';
import type { CustomSession } from './types/auth';
import type { BackendSuccessApiResponse } from './types/api';
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

    await fetch(`${frontendEnv.NEXT_PUBLIC_BACKEND_URL}/contents`, {
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

/**
 * Returns all the guestbook.
 */
export async function getGuestbook(): Promise<Guestbook[]> {
  const guestbookSnapshot = await getDocs(
    query(guestbookCollection, orderBy('createdAt', 'desc'))
  );

  const guestbook = guestbookSnapshot.docs.map((doc) => doc.data());

  const parsedGuestbook = guestbook.map(({ createdAt, ...data }) => ({
    ...data,
    createdAt: createdAt.toJSON()
  })) as Guestbook[];

  return parsedGuestbook;
}

export type BlogWithViews = Blog & Pick<ContentMeta, 'views'>;

/**
 * Returns all the blog posts with the views.
 */
export async function getAllBlogWithViews(): Promise<BlogWithViews[]> {
  const posts = await getAllContents('blog');

  const postsPromises = posts.map(async (post) => {
    const snapshot = await getDoc(doc(contentsCollection, post.slug));
    const { views } = snapshot.data() as ContentMeta;

    return { ...post, views };
  });

  const postsWithViews = await Promise.all(postsPromises);

  return postsWithViews;
}

/**
 * Send email to my email address.
 */
export async function sendEmail(
  text: string,
  session: CustomSession
): Promise<void> {
  const client = createTransport({
    service: 'Gmail',
    auth: {
      user: backendEnv.EMAIL_ADDRESS,
      pass: backendEnv.EMAIL_PASSWORD
    }
  });

  const { name, email } = session.user;

  const emailHeader = `New guestbook from ${name} (${email})`;

  await client.sendMail({
    from: backendEnv.EMAIL_ADDRESS,
    to: backendEnv.EMAIL_TARGET,
    subject: emailHeader,
    text: text
  });
}

/**
 * Returns the contents statistics with selected content type.
 */
export async function getContentsStatistics(
  type: ContentType
): Promise<ContentStatistics> {
  const response = await fetch(
    `${frontendEnv.NEXT_PUBLIC_BACKEND_URL}/statistics?type=${type}`
  );

  const data =
    (await response.json()) as BackendSuccessApiResponse<ContentStatistics>;

  return data.data;
}

/**
 * Returns the contents data with selected content type.
 */
export async function getContentsDataByType(
  type: ContentType
): Promise<ContentColumn[]> {
  const response = await fetch(
    `${frontendEnv.NEXT_PUBLIC_BACKEND_URL}/contents?type=${type}`
  );

  const data = (await response.json()) as BackendSuccessApiResponse<
    ContentColumn[]
  >;

  return data.data;
}
