import {
  getMetaFromDb,
  getContentFiles,
  getContentReadTime,
  getSuggestedContents,
  getContentLastUpdatedDate
} from './mdx-utils';
import type { GetStaticPropsResult } from 'next';
import type {
  Blog,
  Project,
  Content,
  ContentType,
  InjectedMeta,
  BlogWithMeta,
  ProjectWithMeta
} from '@lib/types/contents';

export type ContentSlugProps = InjectedMeta &
  Pick<Content, 'readTime' | 'lastUpdatedAt'> & {
    type: ContentType;
    slug: string;
    suggestedContents: (BlogWithMeta | ProjectWithMeta)[];
  };

/**
 * Returns the MDX contents props.
 */
export function getContentSlug(type: ContentType, slug: string) {
  return async (): Promise<GetStaticPropsResult<ContentSlugProps>> => {
    const metaFromDb = getMetaFromDb(type, slug);

    const lastUpdatedAt = await getContentLastUpdatedDate(type, slug);
    const suggestedContents = await getSuggestedContents(type);

    const readTime = await getContentReadTime(type, slug);

    return {
      props: {
        ...metaFromDb,
        ...(lastUpdatedAt && { lastUpdatedAt }),
        suggestedContents,
        readTime,
        type,
        slug
      }
    };
  };
}

/**
 * Returns all the contents within the selected content directory.
 */
export async function getAllContents(type: 'blog'): Promise<BlogWithMeta[]>;

export async function getAllContents(
  type: 'projects'
): Promise<ProjectWithMeta[]>;

export async function getAllContents(
  type: ContentType
): Promise<(BlogWithMeta | ProjectWithMeta)[]> {
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
): Promise<(BlogWithMeta | ProjectWithMeta)[]> {
  const contentPromises = files.map(async (file) => {
    const { meta } = (await import(`../pages/${type}/${file}`)) as {
      meta:
        | Omit<Blog, 'slug' | 'readTime'>
        | Omit<Project, 'slug' | 'readTime'>;
    };

    const metaFromDb = getMetaFromDb(type, file);

    const slug = file.replace(/\.mdx$/, '');
    const readTime = await getContentReadTime(type, slug);

    return { ...meta, ...metaFromDb, slug, readTime };
  });

  const contents = await Promise.all(contentPromises);

  return contents;
}
