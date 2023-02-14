import {
  getContentFiles,
  getContentReadTime,
  getSuggestedContents,
  getContentLastUpdatedDate
} from './mdx-utils';
import { removeContentExtension } from './helper';
import type { GetStaticPropsResult } from 'next';
import type { Blog, Project, Content, ContentType } from '@lib/types/contents';

export type ContentSlugProps = Pick<Content, 'readTime' | 'lastUpdatedAt'> & {
  type: ContentType;
  slug: string;
  suggestedContents: (Blog | Project)[];
};

/**
 * Returns the MDX contents props.
 */
export function getContentSlug(type: ContentType, slug: string) {
  return async (): Promise<GetStaticPropsResult<ContentSlugProps>> => {
    const lastUpdatedAt = await getContentLastUpdatedDate(type, slug);
    const suggestedContents = await getSuggestedContents(type);

    const readTime = await getContentReadTime(type, slug);

    return {
      props: {
        type,
        slug,
        readTime,
        suggestedContents,
        ...(lastUpdatedAt && { lastUpdatedAt })
      }
    };
  };
}

/**
 * Returns all the contents within the selected content directory.
 */
export async function getAllContents(type: 'blog'): Promise<Blog[]>;
export async function getAllContents(type: 'projects'): Promise<Project[]>;
export async function getAllContents(
  type: ContentType
): Promise<(Blog | Project)[]> {
  const contentPosts = await getContentFiles(type);

  const contents = await getContentByFiles(type, contentPosts);

  return contents;
}

/**
 * Get the contents by files.
 *
 * @param type The type of the content.
 * @param files The files of the content.
 * @returns The contents from the files.
 */
export async function getContentByFiles(
  type: ContentType,
  files: string[]
): Promise<(Blog | Project)[]> {
  const contentPromises = files.map(async (file) => {
    const { meta } = (await import(`../pages/${type}/${file}`)) as {
      meta:
        | Omit<Blog, 'slug' | 'readTime'>
        | Omit<Project, 'slug' | 'readTime'>;
    };

    const slug = removeContentExtension(file);
    const readTime = await getContentReadTime(type, slug);

    return { ...meta, slug, readTime };
  });

  const contents = await Promise.all(contentPromises);

  return contents;
}
