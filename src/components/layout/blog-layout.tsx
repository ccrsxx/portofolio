import Image from 'next/image';
import { motion } from 'framer-motion';
import { formatDate } from '@lib/format';
import { SEO } from '@components/common/seo';
import { BlogStats } from '@components/blog/blog-stats';
import { TableOfContents } from '@components/content/table-of-contents';
import { ReactIcon } from '@components/ui/react-icon';
import type { ReactElement } from 'react';
import type { Variants } from 'framer-motion';
import type { Blog } from '@lib/types/contents';
import type { ContentSlugProps } from '@lib/mdx';

type BlogLayoutProps = {
  children: ReactElement<ContentSlugProps>;
  meta: Pick<Blog, 'title' | 'publishedAt' | 'description' | 'banner' | 'tags'>;
};

const item: Variants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 50 }
};

export function BlogLayout({
  meta: { title, publishedAt, banner },
  children
}: BlogLayoutProps): JSX.Element {
  const { views, likes, readTime } = children.props;

  return (
    <motion.main className='mb-12 grid gap-4' {...item}>
      <SEO title={`${title} | Risal Amin`} />
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
          <i className='mx-auto mt-4 flex items-center gap-2 not-italic'>
            <ReactIcon className='h-10 w-10' iconName='HiHeart' /> {likes}
          </i>
        </TableOfContents>
      </section>
    </motion.main>
  );
}
