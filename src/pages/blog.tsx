import { motion } from 'framer-motion';
import { getAllContents } from '@lib/mdx';
import { getTags } from '@lib/mdx-utils';
import { setTransition } from '@lib/transition';
import { SEO } from '@components/common/seo';
import { Tag } from '@components/blog/tag';
import { SortListbox } from '@components/blog/sort-listbox';
import { BlogCard } from '@components/blog/blog-card';
import { SubscribeCard } from '@components/blog/subscribe-card';
import { Accent } from '@components/ui/accent';
import type { GetStaticPropsResult, InferGetStaticPropsType } from 'next/types';
import type { BlogWithMeta } from '@lib/types/contents';

export default function Blog({
  tags,
  posts
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  return (
    <main className='grid gap-2 py-12'>
      <SEO
        title='Blog | Risal Amin'
        description='A blog by Risal Amin. My thoughts on the web, tech, and everything in between.'
      />
      <section className='grid gap-2'>
        <motion.h1 className='pb-1 text-5xl font-bold' {...setTransition()}>
          <Accent>Blog</Accent>
        </motion.h1>
        <motion.p
          className='text-gray-600 dark:text-gray-300'
          {...setTransition({ delayIn: 0.1 })}
        >
          My thoughts on the web, tech, and everything in between.
        </motion.p>
      </section>
      <section className='grid gap-2'>
        <motion.form {...setTransition({ delayIn: 0.2 })}>
          <input
            className='main-border mt-2 w-full rounded-md px-3 py-2 outline-none
                       transition focus:border-accent-blue dark:bg-dark-background'
            type='text'
            placeholder='Search blog...'
          />
        </motion.form>
        <motion.section
          className='flex items-center gap-2'
          {...setTransition({ delayIn: 0.3 })}
        >
          <p className='text-sm font-medium text-gray-600 dark:text-gray-300'>
            Choose topic:
          </p>
          {tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </motion.section>
        <motion.section className='mt-4' {...setTransition({ delayIn: 0.4 })}>
          <SortListbox />
        </motion.section>
      </section>
      <motion.section
        className='mt-2 grid grid-cols-3 gap-4'
        {...setTransition({ delayIn: 0.5 })}
      >
        {posts.map((post) => (
          <BlogCard {...post} key={post.title} />
        ))}
      </motion.section>
      <motion.section className='mt-6' {...setTransition({ delayIn: 0.6 })}>
        <SubscribeCard />
      </motion.section>
    </main>
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
