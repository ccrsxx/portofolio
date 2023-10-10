import { MDXProvider } from '@mdx-js/react';
import { motion } from 'framer-motion';
import { MdHistory } from 'react-icons/md';
import { setTransition } from '@lib/transition';
import { formatDate } from '@lib/format';
import { components } from '@components/content/mdx-components';
import { SEO } from '@components/common/seo';
import { BlogCard } from '@components/blog/blog-card';
import { ProjectCard } from '@components/project/project-card';
import { BlogStats } from '@components/blog/blog-stats';
import { ImagePreview } from '@components/modal/image-preview';
import { ProjectStats } from '@components/project/project-stats';
import { TableOfContents } from '@components/content/table-of-contents';
import { UnstyledLink } from '@components/link/unstyled-link';
import { CustomLink } from '@components/link/custom-link';
import { LikesCounter } from '@components/content/likes-counter';
import { Accent } from '@components/ui/accent';
import type { ReactElement } from 'react';
import type { Blog, Project, Content } from '@lib/types/contents';
import type { ContentSlugProps } from '@lib/mdx';
import type { Article } from '@components/common/seo';

type ContentLayoutProps = {
  children: ReactElement<ContentSlugProps>;
  meta: Pick<
    Content,
    'title' | 'tags' | 'publishedAt' | 'description' | 'banner'
  > &
    Pick<Blog, 'bannerAlt' | 'bannerLink'> &
    Pick<Project, 'link' | 'github' | 'youtube' | 'category'>;
};

export function ContentLayout({
  meta,
  children
}: ContentLayoutProps): JSX.Element {
  const [
    { title, description, publishedAt, banner, bannerAlt, bannerLink, tags },
    { type, slug, readTime, lastUpdatedAt, suggestedContents }
  ] = [meta, children.props];

  const contentIsBlog = type === 'blog';

  const githubCommitHistoryUrl = `https://github.com/ccrsxx/portofolio/commits/main/src/pages/${type}/${slug}.mdx`;
  const githubContentUrl = `https://github.com/ccrsxx/portofolio/blob/main/src/pages/${type}/${slug}.mdx`;

  const article: Article = {
    type,
    tags,
    banner,
    publishedAt,
    lastUpdatedAt
  };

  return (
    <motion.main className='pt-0' {...setTransition({ distance: 25 })}>
      <SEO title={title} description={description} article={article} />
      <ImagePreview
        className='max-h-[448px] object-cover'
        wrapperClassName='mt-0.5'
        src={banner}
        alt={bannerAlt ?? title}
        customLink={bannerLink}
      />
      <section className='mt-8 grid gap-2'>
        <h1 className='text-2xl font-bold md:text-4xl'>{title}</h1>
        <p className='text-sm text-gray-600 dark:text-gray-300'>
          Written on {formatDate(publishedAt)} by Risal Amin
        </p>
        {lastUpdatedAt && (
          <div className='flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200'>
            <p>Last updated on {formatDate(lastUpdatedAt)}.</p>
            <UnstyledLink
              className='smooth-tab flex items-center gap-1 transition-colors hover:text-accent-main'
              href={githubCommitHistoryUrl}
            >
              <MdHistory className='text-lg' />
              View history
            </UnstyledLink>
          </div>
        )}
        <section className='mt-4 grid gap-2'>
          {contentIsBlog ? (
            <BlogStats slug={slug} readTime={readTime} increment />
          ) : (
            <ProjectStats slug={slug} readTime={readTime} increment {...meta} />
          )}
        </section>
      </section>
      <hr className='mt-4 dark:border-gray-600' />
      <section className='mt-4 grid gap-8 lg:grid-cols-[auto,1fr]'>
        <article id='mdx-article' className='prose max-w-4xl dark:prose-invert'>
          <MDXProvider components={components}>{children}</MDXProvider>
        </article>
        <TableOfContents>
          <LikesCounter slug={slug} />
        </TableOfContents>
      </section>
      <section className='mt-20 grid gap-4'>
        <h2 className='text-2xl font-bold md:text-4xl'>
          <Accent>Other {contentIsBlog ? 'posts' : type} you might like</Accent>
        </h2>
        <section className='card-layout'>
          {contentIsBlog
            ? (suggestedContents as Blog[]).map((suggestedContent, index) => (
                <BlogCard {...suggestedContent} key={index} />
              ))
            : (suggestedContents as Project[]).map(
                (suggestedContent, index) => (
                  <ProjectCard {...suggestedContent} key={index} />
                )
              )}
        </section>
      </section>
      {/* {contentIsBlog && (
        <section className='mt-12'>
          <SubscribeCard />
        </section>
      )} */}
      <section className='mt-8 flex justify-between font-medium'>
        <CustomLink href={`/${type}`}>← Back to {type}</CustomLink>
        <CustomLink href={githubContentUrl}>Edit this on GitHub</CustomLink>
      </section>
    </motion.main>
  );
}
