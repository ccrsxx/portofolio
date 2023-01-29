import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { getAllBlogWithViews } from '@lib/build';
import { getTags, textIncludes } from '@lib/helper';
import { useSessionStorage } from '@lib/hooks/useSessionStorage';
import { setTransition } from '@lib/transition';
import { SEO } from '@components/common/seo';
import { TechTag } from '@components/blog/tech-tag';
import { SortListbox, sortOptions } from '@components/blog/sort-listbox';
import { BlogCard } from '@components/blog/blog-card';
import { SubscribeCard } from '@components/blog/subscribe-card';
import { Accent } from '@components/ui/accent';
import type { ChangeEvent } from 'react';
import type { GetStaticPropsResult, InferGetStaticPropsType } from 'next/types';
import type { Variants } from 'framer-motion';
import type { Blog } from '@lib/types/contents';
import type { BlogWithViews } from '@lib/build';
import type { SortOption } from '@components/blog/sort-listbox';

export default function Blog({
  tags,
  posts
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  const [sortOrder, setSortOrder] = useSessionStorage<SortOption>(
    'sortOrder',
    sortOptions[0]
  );

  const [filteredPosts, setFilteredPosts] = useState<Blog[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const splittedSearch = search.split(' ');

    const newFilteredPosts = posts.filter(({ title, description, tags }) => {
      const isTitleMatch = textIncludes(title, search);
      const isDescriptionMatch = textIncludes(description, search);
      const isTagsMatch = splittedSearch.every((tag) => tags.includes(tag));

      return isTitleMatch || isDescriptionMatch || isTagsMatch;
    });

    if (sortOrder === 'date') newFilteredPosts.sort();
    else newFilteredPosts.sort((a, b) => (b?.views ?? 0) - (a?.views ?? 0));

    setFilteredPosts(newFilteredPosts);
  }, [posts, search, sortOrder]);

  const handleSearchChange = ({
    target: { value }
  }: ChangeEvent<HTMLInputElement>): void => setSearch(value);

  const handleTagClick = (tag: string) => (): void => {
    if (search.includes(tag)) {
      const poppedTagSearch = search
        .split(' ')
        .filter((t) => t !== tag)
        .join(' ');

      setSearch(poppedTagSearch);
    } else {
      const appendedTagSearch = search ? `${search.trim()} ${tag}` : tag;

      setSearch(appendedTagSearch);
    }
  };

  const filteredTags = getTags(filteredPosts);

  const isTagSelected = (tag: string): boolean =>
    filteredTags.includes(tag) && search.toLowerCase().split(' ').includes(tag);

  return (
    <main className='py-12'>
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
      <section className='mt-2'>
        <motion.form {...setTransition({ delayIn: 0.2 })}>
          <input
            className='main-border mt-2 w-full rounded-md px-3 py-2 outline-none
                       transition focus:border-accent-blue dark:bg-dark-background'
            type='text'
            value={search}
            placeholder='Search blog...'
            onChange={handleSearchChange}
          />
        </motion.form>
        <motion.section
          className='mt-2 flex items-center gap-2'
          {...setTransition({ delayIn: 0.3 })}
        >
          <p className='text-sm font-medium text-gray-600 dark:text-gray-300'>
            Choose topic:
          </p>
          {tags.map((tag) => (
            <TechTag
              disabled={!filteredTags.includes(tag)}
              onClick={handleTagClick(tag)}
              key={tag}
            >
              {isTagSelected(tag) ? <Accent>{tag}</Accent> : tag}
            </TechTag>
          ))}
        </motion.section>
        <motion.section className='mt-6' {...setTransition({ delayIn: 0.4 })}>
          <SortListbox sortOrder={sortOrder} onSortOrderChange={setSortOrder} />
        </motion.section>
      </section>
      <motion.section
        className='mt-4 grid grid-cols-3 gap-4'
        {...setTransition({ delayIn: 0.5 })}
      >
        <AnimatePresence mode='popLayout'>
          {filteredPosts.length ? (
            <AnimatePresence>
              {filteredPosts.map((post) => (
                <motion.article
                  className='grid'
                  layout='position'
                  {...variants}
                  key={post.title}
                >
                  <BlogCard Tag='div' {...post} isTagSelected={isTagSelected} />
                </motion.article>
              ))}
            </AnimatePresence>
          ) : (
            <motion.h2
              className='col-span-full text-center text-3xl font-bold'
              {...setTransition({ delayIn: 0.2 })}
              key='not-found'
            >
              <Accent>Sorry, not found :&#40;</Accent>
            </motion.h2>
          )}
        </AnimatePresence>
      </motion.section>
      <motion.section className='mt-8' {...setTransition({ delayIn: 0.6 })}>
        <SubscribeCard />
      </motion.section>
    </main>
  );
}

type BlogProps = {
  posts: BlogWithViews[];
  tags: string[];
};

export async function getStaticProps(): Promise<
  GetStaticPropsResult<BlogProps>
> {
  const posts = await getAllBlogWithViews();
  const tags = getTags(posts);

  return {
    props: {
      posts,
      tags
    },
    revalidate: 60
  };
}

const variants: Variants = {
  initial: {
    scale: 0.9,
    opacity: 0
  },
  animate: {
    scale: 1,
    opacity: 1
  },
  exit: {
    scale: 0.9,
    opacity: 0
  }
};
