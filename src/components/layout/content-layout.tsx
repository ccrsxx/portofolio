import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HiHeart } from 'react-icons/hi2';
import { REPOSITORY_URL } from '@lib/env';
import { setTransition } from '@lib/transition';
import { formatDate } from '@lib/format';
import { SEO } from '@components/common/seo';
import { BlogCard } from '@components/blog/blog-card';
import { ProjectCard } from '@components/project/project-card';
import { BlogStats } from '@components/blog/blog-stats';
import { ProjectStats } from '@components/project/project-stats';
import { TableOfContents } from '@components/content/table-of-contents';
import { SubscribeCard } from '@components/blog/subscribe-card';
import { AccentExternalLink } from '@components/link/accent-external-link';
import { Accent } from '@components/ui/accent';
import type { ReactElement } from 'react';
import type {
  Blog,
  Project,
  BlogWithMeta,
  ProjectWithMeta
} from '@lib/types/contents';
import type { ContentSlugProps } from '@lib/mdx';

type ContentLayoutProps = {
  children: ReactElement<ContentSlugProps>;
  meta: Pick<Blog, 'title' | 'publishedAt' | 'description' | 'banner'> &
    Pick<Project, 'techs' | 'link' | 'github' | 'youtube' | 'category'>;
};

export function ContentLayout({
  meta,
  children
}: ContentLayoutProps): JSX.Element {
  const [
    { title, description, publishedAt, banner },
    { type, slug, views, likes, readTime, suggestedContents }
  ] = [meta, children.props];

  const contentIsBlog = type === 'blog';

  const contentUrl = `${REPOSITORY_URL}/blob/main/src/pages/${type}/${slug}.mdx`;

  return (
    <motion.main
      className='mb-12 grid gap-4'
      {...setTransition({ distance: 25 })}
    >
      <SEO title={`${title} | Risal Amin`} description={description} />
      <Image
        className='h-[448px] rounded-md object-cover'
        src={banner}
        alt={title}
        placeholder='blur'
      />
      <section className='mt-4 grid gap-2'>
        <h1 className='text-4xl font-bold'>{title}</h1>
        <p className='text-sm text-gray-600 dark:text-gray-300'>
          Written on {formatDate(publishedAt)} by Risal Amin
        </p>
        {contentIsBlog ? (
          <BlogStats className='mt-4' readTime={readTime} views={views} />
        ) : (
          <ProjectStats readTime={readTime} views={views} {...meta} />
        )}
      </section>
      <hr className='dark:border-gray-600' />
      <section className='flex justify-between gap-4'>
        <article
          id='mdx-article'
          className='prose mt-2 dark:prose-invert md:prose-lg [&>:is(h2,h3)]:scroll-mt-24'
        >
          {children}
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
      <section className='mt-16 grid gap-4'>
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
        <section className='mt-8'>
          <SubscribeCard />
        </section>
      )}
      <section className='mt-4 flex justify-between font-medium'>
        <Link className='animated-underline with-dots' href={`/${type}`}>
          <Accent>← Back to {type}</Accent>
        </Link>
        <AccentExternalLink href={contentUrl}>
          Edit this on GitHub
        </AccentExternalLink>
      </section>
    </motion.main>
  );
}
