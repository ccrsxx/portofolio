import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HiHeart } from 'react-icons/hi2';
import { REPOSITORY_URL } from '@lib/env';
import { formatDate } from '@lib/format';
import { SEO } from '@components/common/seo';
import { BlogStats } from '@components/blog/blog-stats';
import { TableOfContents } from '@components/content/table-of-contents';
import { SubscribeCard } from '@components/blog/subscribe-card';
import type { ReactElement } from 'react';
import type { Variants } from 'framer-motion';
import type { Blog } from '@lib/types/contents';
import type { ContentSlugProps } from '@lib/mdx';

type ContentLayoutProps = {
  children: ReactElement<ContentSlugProps>;
  meta: Pick<Blog, 'title' | 'publishedAt' | 'description' | 'banner' | 'tags'>;
};

const item: Variants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 50 }
};

export function ContentLayout({
  meta: { title, description, publishedAt, banner },
  children
}: ContentLayoutProps): JSX.Element {
  const { type, slug, views, likes, readTime } = children.props;

  const contentUrl = `${REPOSITORY_URL}/blob/main/src/pages/blog/${slug}.mdx`;

  return (
    <motion.main className='mb-12 grid gap-4' {...item}>
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
        <BlogStats className='mt-4' views={views} readTime={readTime} />
      </section>
      <hr className='dark:border-gray-600' />
      <section className='flex justify-between gap-4'>
        <article
          id='mdx-article'
          className='prose mt-2 dark:prose-invert md:prose-lg [&>:is(h2,h3)]:scroll-m-24'
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
      <SubscribeCard />
      <section
        className='[&>a>span]:gradient-title [&>a]:animated-underline
                   mt-4 flex justify-between font-medium'
      >
        <Link className='with-dots' href={`/${type}`}>
          <span>← Back to {type}</span>
        </Link>
        <a
          className='with-dots'
          href={contentUrl}
          target='_blank'
          rel='noreferrer'
        >
          <span>Edit this on GitHub</span>
        </a>
      </section>
    </motion.main>
  );
}
