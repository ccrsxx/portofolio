import { frontendEnv } from '@lib/env';
import type { Content, PathContentType } from '@lib/types/contents';
import type { Metadata } from 'next';

export type ArticleMeta = Pick<
  Content,
  'tags' | 'banner' | 'publishedAt' | 'lastUpdatedAt'
> & {
  type: PathContentType;
};

type GeneratePageMetadataParams = {
  title: string;
  description: string;
  pathname: string;
  article?: ArticleMeta;
};

/**
 * Generates a complete Metadata object for a page.
 *
 * The `title` is set as a plain string so it works with the root layout's
 * `title.template: '%s | Risal Amin'`. The template automatically produces
 * the full title (e.g. "About | Risal Amin") for `<title>`, `og:title`,
 * and `twitter:title`.
 */
export function generatePageMetadata({
  title,
  description,
  pathname,
  article
}: GeneratePageMetadataParams): Metadata {
  const isHomepage = pathname === '/';

  const ogImageQuery = new URLSearchParams();

  ogImageQuery.set('title', title);
  ogImageQuery.set('description', description ?? 'Description');

  if (article) {
    ogImageQuery.set('type', article.type);
    ogImageQuery.set('article', 'true');
    ogImageQuery.set(
      'image',
      frontendEnv.NEXT_PUBLIC_URL + article.banner?.src
    );
  }

  const ogImageUrl = `${frontendEnv.NEXT_PUBLIC_BACKEND_URL}/og?${ogImageQuery.toString()}`;

  const ogUrl = `${frontendEnv.NEXT_PUBLIC_BACKEND_URL}${isHomepage ? '' : pathname}`;

  const metadata: Metadata = {
    title,
    description,
    keywords: article?.tags,
    authors: [{ name: 'Risal Amin' }],
    generator: 'Next.js',
    twitter: {
      images: {
        url: ogImageUrl,
        alt: title
      },
      card: 'summary_large_image',
      site: '@ccrsxx',
      creator: '@ccrsxx'
    },
    openGraph: {
      url: ogUrl,
      images: {
        url: ogImageUrl,
        alt: title,
        type: 'image/png',
        width: 1200,
        height: 600
      },
      locale: 'en_US',
      siteName: 'risalamin.com',
      type: article ? 'article' : 'website',
      ...(article && {
        publishedTime: article.publishedAt,
        modifiedTime: article.lastUpdatedAt,
        authors: ['Risal Amin'],
        section: 'Programming',
        tags: article.tags?.split(',').map((tag) => tag.trim())
      })
    }
  };

  return metadata;
}
