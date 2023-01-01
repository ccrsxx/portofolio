import { join } from 'path/posix';
import {
  getMetaFromDb,
  getContentFiles,
  getContentReadTime
} from './mdx-utils';
import type { GetStaticPropsResult } from 'next';
import type {
  Blog,
  Project,
  ContentType,
  InjectedMeta,
  BlogWithMeta,
  ProjectWithMeta
} from '@lib/types/contents';

export type ContentSlugProps = Pick<Blog, 'readTime'> &
  InjectedMeta & {
    type: ContentType;
    slug: string;
    suggestedContents: (BlogWithMeta | ProjectWithMeta)[];
  };

/**
 * TODO: Get the static props for MDX Layout.
 *
 * @returns The static props needed for MDX Layout.
 */
export function getContentSlug(type: ContentType, slug: string) {
  return async (): Promise<GetStaticPropsResult<ContentSlugProps>> => {
    const contentFiles = await getContentFiles(type);

    const shuffledFiles = contentFiles
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);

    const randomShuffledFiles = shuffledFiles.slice(0, 3);

    const suggestedContents = await Promise.all(
      randomShuffledFiles.map((file) => getContentByFile(type, file))
    );

    const contentPath = join('src', 'pages', type, `${slug}.mdx`);

    const readTime = await getContentReadTime(contentPath);
    const metaFromDb = getMetaFromDb(type, slug);

    return {
      props: {
        ...metaFromDb,
        suggestedContents,
        readTime,
        type,
        slug
      }
    };
  };
}

/**
 * Get all the contents.
 *
 * @param type The type of the content.
 * @returns The contents.
 */
export async function getAllContents(type: 'blog'): Promise<BlogWithMeta[]>;

export async function getAllContents(
  type: 'projects'
): Promise<ProjectWithMeta[]>;

export async function getAllContents(
  type: ContentType
): Promise<BlogWithMeta[] | ProjectWithMeta[]> {
  const contentPosts = await getContentFiles(type);

  const contents = (await Promise.all(
    contentPosts.map(async (contentPost) => getContentByFile(type, contentPost))
  )) as BlogWithMeta[] | ProjectWithMeta[];

  return contents;
}

/**
 * Get the content by file.
 *
 * @param type The type of the content.
 * @param fileName The file name of the content.
 */
export async function getContentByFile(
  type: ContentType,
  fileName: string
): Promise<BlogWithMeta | ProjectWithMeta> {
  const { meta } = (await import(`../pages/${type}/${fileName}`)) as {
    meta: Omit<Blog, 'slug' | 'readTime'> | Omit<Project, 'slug' | 'readTime'>;
  };

  const contentDirectory = join('src', 'pages', type);
  const contentPath = join(contentDirectory, fileName);

  const readTime = await getContentReadTime(contentPath);

  const slug = fileName.replace(/\.mdx$/, '');
  const metaFromDb = getMetaFromDb(type, fileName);

  return { ...meta, ...metaFromDb, readTime, slug };
}
