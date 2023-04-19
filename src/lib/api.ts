import { createTransport } from 'nodemailer';
import {
  doc,
  query,
  where,
  getDoc,
  setDoc,
  getDocs,
  orderBy
} from 'firebase/firestore';
import {
  contentsCollection,
  guestbookCollection
} from './firebase/collections';
import { getAllContents } from './mdx';
import { getContentFiles } from './mdx-utils';
import { VALID_CONTENT_TYPES } from './helper-server';
import { removeContentExtension } from './helper';
import type { Blog, ContentType } from './types/contents';
import type { CustomSession } from './types/api';
import type { ContentMeta } from './types/meta';
import type {
  ContentData,
  ContentColumn,
  ContentStatistics
} from './types/statistics';
import type { Guestbook } from './types/guestbook';

/**
 * Initialize all blog and projects if not exists in firestore at build time.
 */
export async function initializeAllContents(): Promise<void> {
  const contentPromises = VALID_CONTENT_TYPES.map((type) =>
    initializeContents(type)
  );
  await Promise.all(contentPromises);
}

/**
 * Initialize contents with selected content type.
 */
export async function initializeContents(type: ContentType): Promise<void> {
  const contents = await getContentFiles(type);

  const contentPromises = contents.map(async (slug) => {
    slug = removeContentExtension(slug);

    const snapshot = await getDoc(doc(contentsCollection, slug));

    if (snapshot.exists()) return;

    const newContent: Omit<ContentMeta, 'slug'> = {
      type,
      views: 0,
      likes: 0,
      likesBy: {}
    };

    await setDoc(doc(contentsCollection, slug), newContent);
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
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  const { name, email } = session.user;

  const emailHeader = `New guestbook from ${name} (${email})`;

  await client.sendMail({
    from: process.env.EMAIL_ADDRESS,
    to: process.env.EMAIL_TARGET,
    subject: emailHeader,
    text: text
  });
}

/**
 * Returns the contents statistics with selected content type.
 */
export async function getContentStatistics(
  type: ContentType
): Promise<ContentStatistics> {
  const contentsSnapshot = await getDocs(
    query(contentsCollection, where('type', '==', type))
  );

  const contents = contentsSnapshot.docs.map((doc) => doc.data());

  const [totalPosts, totalViews, totalLikes] = contents.reduce(
    ([accPosts, accViews, accLikes], { views, likes }) => [
      accPosts + 1,
      accViews + views,
      accLikes + likes
    ],
    [0, 0, 0]
  );

  return { type, totalPosts, totalViews, totalLikes };
}

/**
 * Returns all the contents statistics.
 */
export async function getAllContentsStatistics(): Promise<ContentStatistics[]> {
  const statisticsPromises = VALID_CONTENT_TYPES.map((type) =>
    getContentStatistics(type)
  );

  const statistics = await Promise.all(statisticsPromises);

  return statistics;
}

/**
 * Returns the content data with selected content type.
 */
export async function getContentData(type: ContentType): Promise<ContentData> {
  const contentsSnapshot = await getDocs(
    query(contentsCollection, where('type', '==', type))
  );

  const contents = contentsSnapshot.docs.map((doc) => doc.data());

  const filteredContents: ContentColumn[] = contents.map(
    ({ slug, views, likes }) => ({
      slug,
      views,
      likes
    })
  );

  const contentData: ContentData = {
    type,
    data: filteredContents
  };

  return contentData;
}

/**
 * Returns all the content data.
 */
export async function getAllContentsData(): Promise<ContentData[]> {
  const contentDataPromises = VALID_CONTENT_TYPES.map((type) =>
    getContentData(type)
  );

  const contentData = await Promise.all(contentDataPromises);

  return contentData;
}
