import { ContentLayout } from '@components/layout/content-layout';
import { PageTransition } from '@components/transitions/page-transition';
import { removeContentExtension } from '@lib/helper';
import { getContentSlugProps, getSlugContent } from '@lib/mdx';
import { getContentFiles } from '@lib/mdx-utils';
import { generatePageMetadata, type ArticleMeta } from '@lib/metadata';
import type { PathContentType } from '@lib/types/contents';
import type { Metadata } from 'next';

export async function generateSlugStaticParams(
  type: PathContentType
): Promise<{ slug: string }[]> {
  const files = await getContentFiles(type);
  return files.map((f) => ({ slug: removeContentExtension(f) }));
}

export async function generateSlugMetadata(
  type: PathContentType,
  params: Promise<{ slug: string }>
): Promise<Metadata> {
  const { slug } = await params;

  const { meta } = await getSlugContent(type, slug);

  const contentSlugProps = await getContentSlugProps(type, slug);

  const article: ArticleMeta = {
    type,
    tags: meta.tags,
    banner: meta.banner,
    publishedAt: meta.publishedAt,
    lastUpdatedAt: contentSlugProps.lastUpdatedAt
  };

  return generatePageMetadata({
    title: meta.title,
    description: meta.description,
    pathname: `/${type}/${slug}`,
    article
  });
}

export async function SlugPage({
  type,
  params
}: {
  type: PathContentType;
  params: Promise<{ slug: string }>;
}): Promise<React.JSX.Element> {
  const { slug } = await params;

  const { meta, Markdown } = await getSlugContent(type, slug);

  const contentSlugProps = await getContentSlugProps(type, slug);

  return (
    <PageTransition enter='slide-up'>
      <ContentLayout meta={meta} contentSlugProps={contentSlugProps}>
        <Markdown />
      </ContentLayout>
    </PageTransition>
  );
}
