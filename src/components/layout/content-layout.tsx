import { MDXProvider } from '@mdx-js/react';
import { motion } from 'framer-motion';
import { MdHistory } from 'react-icons/md';
import { HiHeart } from 'react-icons/hi2';
import { setTransition } from '@lib/transition';
import { formatDate } from '@lib/format';
import { components } from '@components/content/components';
import { SEO } from '@components/common/seo';
import { BlogCard } from '@components/blog/blog-card';
import { ProjectCard } from '@components/project/project-card';
import { BlogStats } from '@components/blog/blog-stats';
import { ImagePreview } from '@components/modal/image-preview';
import { ProjectStats } from '@components/project/project-stats';
import { TableOfContents } from '@components/content/table-of-contents';
import { SubscribeCard } from '@components/blog/subscribe-card';
import { UnstyledLink } from '@components/link/unstyled-link';
import { CustomLink } from '@components/link/custom-link';
import { Accent } from '@components/ui/accent';
import type { ReactElement } from 'react';
import type {
  Blog,
  Project,
  Content,
  BlogWithMeta,
  ProjectWithMeta
} from '@lib/types/contents';
import type { ContentSlugProps } from '@lib/mdx';

type ContentLayoutProps = {
  children: ReactElement<ContentSlugProps>;
  meta: Pick<Content, 'title' | 'publishedAt' | 'description' | 'banner'> &
    Pick<Blog, 'altBanner' | 'altBannerLink'> &
    Pick<Project, 'techs' | 'link' | 'github' | 'youtube' | 'category'>;
};

export function ContentLayout({
  meta,
  children
}: ContentLayoutProps): JSX.Element {
  const [
    { title, description, publishedAt, banner, altBanner, altBannerLink },
    { type, slug, views, likes, readTime, lastUpdatedAt, suggestedContents }
  ] = [meta, children.props];

  const contentIsBlog = type === 'blog';

  const githubCommitHistoryUrl = `https://github.com/ccrsxx/ccrsxx.me/commits/main/src/pages/${type}/${slug}.mdx`;
  const githubContentUrl = `https://github.com/ccrsxx/ccrsxx.me/blob/main/src/pages/${type}/${slug}.mdx`;

  return (
    <motion.main className='pb-12' {...setTransition({ distance: 25 })}>
      <SEO title={`${title} | Risal Amin`} description={description} />
      <ImagePreview
        className='max-h-[448px] object-cover'
        src={banner}
        alt={altBanner ?? title}
        altBannerLink={altBannerLink}
      />
      <section className='mt-8 grid gap-2'>
        <h1 className='text-4xl font-bold'>{title}</h1>
        <p className='text-sm text-gray-600 dark:text-gray-300'>
          Written on {formatDate(publishedAt)} by Risal Amin
        </p>
        {lastUpdatedAt && (
          <div className='flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200'>
            <p>Last updated on {formatDate(lastUpdatedAt)}.</p>
            <UnstyledLink
              className='flex items-center gap-1 transition-colors hover:text-accent-blue'
              href={githubCommitHistoryUrl}
            >
              <MdHistory className='text-lg' />
              View history
            </UnstyledLink>
          </div>
        )}
        <section className='mt-4 grid gap-2'>
          {contentIsBlog ? (
            <BlogStats readTime={readTime} views={views} />
          ) : (
            <ProjectStats readTime={readTime} views={views} {...meta} />
          )}
        </section>
      </section>
      <hr className='mt-4 dark:border-gray-600' />
      <section className='mt-4 flex gap-8'>
        <article
          id='mdx-article'
          className='prose max-w-4xl dark:prose-invert [&>:is(h2,h3)]:scroll-mt-24'
        >
          <MDXProvider components={components}>{children}</MDXProvider>
        </article>
        <TableOfContents>
          <div className='mt-4 flex items-center justify-center gap-2'>
            <button
              className='text-gray-400 transition-transform hover:scale-110
                         active:scale-95 dark:text-gray-600'
            >
              <HiHeart className='h-12 w-12' />
            </button>
            <p className='text-lg text-gray-400 dark:text-gray-500'>{likes}</p>
          </div>
        </TableOfContents>
      </section>
      <section className='mt-20 grid gap-4'>
        <h2 className='text-4xl font-bold'>
          <Accent>Other {contentIsBlog ? 'posts' : type} you might like</Accent>
        </h2>
        <section className='grid grid-cols-3 gap-4'>
          {contentIsBlog
            ? (suggestedContents as BlogWithMeta[]).map(
                (suggestedContent, index) => (
                  <BlogCard {...suggestedContent} key={index} />
                )
              )
            : (suggestedContents as ProjectWithMeta[]).map(
                (suggestedContent, index) => (
                  <ProjectCard {...suggestedContent} key={index} />
                )
              )}
        </section>
      </section>
      {contentIsBlog && (
        <section className='mt-12'>
          <SubscribeCard />
        </section>
      )}
      <section className='mt-8 flex justify-between font-medium'>
        <CustomLink href={`/${type}`}>← Back to {type}</CustomLink>
        <CustomLink href={githubContentUrl}>Edit this on GitHub</CustomLink>
      </section>
    </motion.main>
  );
}
