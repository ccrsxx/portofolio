import { join } from 'path/posix';
import { readdir } from 'fs/promises';
import { getContentReadTime, getMetaFromDb } from './mdx-utils';
import type { GetStaticPropsResult } from 'next';
import type {
  Blog,
  Project,
  ContentType,
  InjectedMeta,
  BlogWithMeta,
  ProjectWithMeta
} from '@lib/types/contents';

export type ContentSlugProps = Pick<Blog, 'readTime'> & InjectedMeta;

/**
 * TODO: Get the static props for MDX Layout.
 *
 * @returns Unknown for now.
 */
export function getContentSlug(type: ContentType, slug: string) {
  return async (): Promise<GetStaticPropsResult<ContentSlugProps>> => {
    const contentPath = join('src', 'pages', type, `${slug}.mdx`);

    const readTime = await getContentReadTime(contentPath);
    const metaFromDb = getMetaFromDb(type, slug);

    return {
      props: {
        readTime,
        ...metaFromDb
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
  type: 'project'
): Promise<ProjectWithMeta[]>;

export async function getAllContents(
  type: ContentType
): Promise<BlogWithMeta[] | ProjectWithMeta[]> {
  const contentDirectory = join('src', 'pages', type);
  const contentPosts = await readdir(contentDirectory);

  const contents = (await Promise.all(
    contentPosts.map(async (contentPost) => {
      const { meta } = (await import(`${contentDirectory}/${contentPost}`)) as {
        meta:
          | Omit<Blog, 'slug' | 'readTime'>
          | Omit<Project, 'slug' | 'readTime'>;
      };

      const contentPath = join(contentDirectory, contentPost);
      const readTime = await getContentReadTime(contentPath);

      const slug = contentPost.replace(/\.mdx$/, '');
      const metaFromDb = getMetaFromDb(type, contentPost);

      return { ...meta, ...metaFromDb, readTime, slug };
    })
  )) as BlogWithMeta[] | ProjectWithMeta[];

  return contents;
}
