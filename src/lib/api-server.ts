import { doc, getDoc, setDoc } from 'firebase/firestore';
import { contentsCollection } from './firebase/collections';
import { getAllContents } from './mdx';
import { getContentFiles } from './mdx-utils';
import { VALID_CONTENT_TYPES } from './helper-server';
import { removeContentExtension } from './helper';
import type { Blog, ContentType } from './types/contents';
import type { ContentMeta } from './types/meta';

/**
 * Initialize all blog and projects if not exists in firestore at build time
 */
export async function initializeAllContents(): Promise<void> {
  const contentPromises = VALID_CONTENT_TYPES.map((type) =>
    initializeContents(type)
  );
  await Promise.all(contentPromises);
}

/**
 * Initialize contents with selected content type
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
      likes: 0
    };

    await setDoc(doc(contentsCollection, slug), newContent);
  });

  await Promise.all(contentPromises);
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
