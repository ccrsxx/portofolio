import { createTransport } from 'nodemailer';
import {
  doc,
  query,
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
  const snapshot = await getDocs(
    query(guestbookCollection, orderBy('createdAt', 'desc'))
  );

  const guestbook = snapshot.docs.map((doc) => doc.data());
  const parsedGuestbook = JSON.parse(JSON.stringify(guestbook)) as Guestbook[];

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
      user: process.env.EMAIL_ADDRESS as string,
      pass: process.env.EMAIL_PASSWORD as string
    }
  });

  const { name, email } = session.user;

  const emailHeader = `New guestbook from ${name} (${email})`;

  await client.sendMail({
    from: process.env.EMAIL_ADDRESS as string,
    to: process.env.EMAIL_TARGET as string,
    subject: emailHeader,
    text: text
  });
}
