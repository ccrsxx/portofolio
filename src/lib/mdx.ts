import type {
  Blog,
  Content,
  ContentType,
  PathContentType,
  Project
} from '@lib/types/contents';
import { getContentFiles } from './contents';
import {
  convertPathContentToContentType,
  removeContentExtension
} from './helper';
import { getContentLastUpdatedDate, getContentReadTime } from './mdx-utils';

export type ContentSlugProps = Pick<Content, 'readTime' | 'lastUpdatedAt'> & {
  type: ContentType;
  slug: string;
  suggestedContents: (Blog | Project)[];
};

/**
 * Returns the MDX contents props for a given content slug.
 */
export async function getContentSlugProps(
  type: PathContentType,
  slug: string
): Promise<ContentSlugProps> {
  const lastUpdatedAt = await getContentLastUpdatedDate(type, slug);

  const suggestedContents = await getSuggestedContents(type, [slug]);

  const readTime = await getContentReadTime(type, slug);

  const parsedContentType = convertPathContentToContentType(type);

  return {
    type: parsedContentType,
    slug,
    readTime,
    suggestedContents,
    ...(lastUpdatedAt && { lastUpdatedAt })
  };
}

/**
 * Returns all the contents within the selected content directory.
 */
export async function getAllContents<T extends PathContentType>(
  type: T,
  ignoreFiles?: string[]
): Promise<(T extends 'blog' ? Blog : Project)[]> {
  const contentPosts = await getContentFiles(type, ignoreFiles);

  const contents = await getContentByFiles(type, contentPosts);

  return contents;
}

export type SlugContentMeta = Omit<Content, 'slug' | 'readTime'>;

export type SlugContentMarkdown = () => React.JSX.Element;

export type SlugContent = {
  meta: SlugContentMeta;
  Markdown: SlugContentMarkdown;
};

export async function getSlugContent(
  type: PathContentType,
  slug: string
): Promise<SlugContent> {
  if (type === 'blog') {
    const { meta } = (await import(`@contents/blog/${slug}`)) as {
      meta: SlugContentMeta;
    };

    const { default: Markdown } = (await import(
      `@contents/blog/${slug}.mdx`
    )) as {
      default: SlugContentMarkdown;
    };

    return { meta, Markdown };
  } else {
    const { meta } = (await import(`@contents/projects/${slug}`)) as {
      meta: SlugContentMeta;
    };

    const { default: Markdown } = (await import(
      `@contents/projects/${slug}.mdx`
    )) as {
      default: SlugContentMarkdown;
    };

    return { meta, Markdown };
  }
}

/**
 * Get the contents by files.
 *
 * @param type The type of the content.
 * @param files The files of the content.
 * @returns The contents from the files.
 */
export async function getContentByFiles(
  type: PathContentType,
  files: string[]
): Promise<(Blog | Project)[]> {
  const contentPromises = files.map(async (file) => {
    const slug = removeContentExtension(file);

    const { meta } = await getSlugContent(type, slug);

    const readTime = await getContentReadTime(type, slug);

    return { ...meta, slug, readTime };
  });

  const contents = await Promise.all(contentPromises);

  return contents;
}

/**
 * Returns three random suggested contents.
 */
export async function getSuggestedContents(
  type: PathContentType,
  ignoreFiles?: string[]
): Promise<(Blog | Project)[]> {
  const contentFiles = await getContentFiles(type, ignoreFiles);

  const shuffledFiles = contentFiles
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

  const randomShuffledFiles = shuffledFiles.slice(0, 3);

  const suggestedContents = await getContentByFiles(type, randomShuffledFiles);

  return suggestedContents;
}
