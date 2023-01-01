import { motion } from 'framer-motion';
import { getAllContents } from '@lib/mdx';
import { getTags } from '@lib/mdx-utils';
import { SEO } from '@components/common/seo';
import { Tag } from '@components/blog/tag';
import { SortListbox } from '@components/blog/sort-listbox';
import { BlogCard } from '@components/blog/blog-card';
import { SubscribeCard } from '@components/blog/subscribe-card';
import type { GetStaticPropsResult, InferGetStaticPropsType } from 'next/types';
import type { Variants } from 'framer-motion';
import type { Blog, BlogWithMeta } from '@lib/types/contents';

const item: Variants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 50 }
};

export default function Blog({
  tags,
  posts
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  return (
    <motion.main
      className='grid gap-2 py-12'
      variants={item}
      initial='initial'
      animate='animate'
      exit='exit'
    >
      <SEO
        title='Blog | Risal Amin'
        description='A blog by Risal Amin. My thoughts on the web, tech, and everything in between.'
      />
      <section className='grid gap-2'>
        <h1 className='gradient-heading pb-1 text-5xl font-bold'>Blog</h1>
        <p className='text-gray-600 dark:text-gray-300'>
          My thoughts on the web, tech, and everything in between.
        </p>
      </section>
      <section className='grid gap-2'>
        <input
          className='main-border mt-2 rounded-md px-3 py-2 outline-none transition
                     focus:border-accent-blue dark:bg-dark-background'
          type='text'
          placeholder='Search blog...'
        />
        <section className='flex items-center gap-2'>
          <p className='text-sm font-medium text-gray-600 dark:text-gray-300'>
            Choose topic:
          </p>
          {tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </section>
        <section className='mt-4'>
          <SortListbox />
        </section>
      </section>
      <section className='mt-2 grid grid-cols-3 gap-4'>
        {posts.map((post) => (
          <BlogCard {...post} key={post.title} />
        ))}
      </section>
      <section className='mt-6'>
        <SubscribeCard />
      </section>
    </motion.main>
  );
}

type BlogProps = {
  posts: BlogWithMeta[];
  tags: string[];
};

export async function getStaticProps(): Promise<
  GetStaticPropsResult<BlogProps>
> {
  const posts = await getAllContents('blog');
  const tags = getTags(posts);

  return {
    props: {
      posts,
      tags
    }
  };
}
