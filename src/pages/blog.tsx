import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { getAllBlogWithViews } from '@lib/api';
import { getTags, textIncludes } from '@lib/helper';
import { useSessionStorage } from '@lib/hooks/useSessionStorage';
import { setTransition } from '@lib/transition';
import { SEO } from '@components/common/seo';
import { BlogTag } from '@components/blog/blog-tag';
import { SortListbox, sortOptions } from '@components/blog/sort-listbox';
import { BlogCard } from '@components/blog/blog-card';
import { Accent } from '@components/ui/accent';
import type { ChangeEvent } from 'react';
import type { GetStaticPropsResult, InferGetStaticPropsType } from 'next/types';
import type { MotionProps } from 'framer-motion';
import type { Blog } from '@lib/types/contents';
import type { BlogWithViews } from '@lib/api';
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
    else newFilteredPosts.sort((a, b) => b.views - a.views);

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

  const isTagSelected = (tag: string): boolean => {
    const isInFilteredTags = filteredTags.includes(tag);
    const isInSearch = search.toLowerCase().split(' ').includes(tag);

    return isInFilteredTags && isInSearch;
  };

  return (
    <main className='min-h-screen'>
      <SEO
        title='Blog'
        description='A blog by Risal Amin. My thoughts on the web, tech, and everything in between.'
      />
      <section className='grid gap-2'>
        <motion.h1
          className='text-3xl font-bold md:text-5xl'
          {...setTransition()}
        >
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
        <motion.section {...setTransition({ delayIn: 0.2 })}>
          <input
            className='custom-input mt-2 w-full'
            type='text'
            value={search}
            placeholder='Search blog...'
            onChange={handleSearchChange}
          />
        </motion.section>
        <motion.section
          className='mt-2 flex flex-wrap items-center gap-2'
          {...setTransition({ delayIn: 0.3 })}
        >
          <p className='text-sm font-medium text-gray-600 dark:text-gray-300'>
            Choose topic:
          </p>
          {tags.map((tag) => (
            <BlogTag
              className='smooth-tab'
              disabled={!filteredTags.includes(tag)}
              onClick={handleTagClick(tag)}
              key={tag}
            >
              {isTagSelected(tag) ? <Accent>{tag}</Accent> : tag}
            </BlogTag>
          ))}
        </motion.section>
        <motion.section className='mt-6' {...setTransition({ delayIn: 0.4 })}>
          <SortListbox sortOrder={sortOrder} onSortOrderChange={setSortOrder} />
        </motion.section>
      </section>
      <motion.section
        className='card-layout mt-4'
        {...setTransition({ delayIn: 0.5 })}
      >
        <AnimatePresence mode='popLayout'>
          {filteredPosts.length ? (
            <AnimatePresence>
              {filteredPosts.map((post) => (
                <motion.article
                  {...variants}
                  className='grid'
                  layout='position'
                  key={post.title}
                >
                  <BlogCard {...post} tag='div' isTagSelected={isTagSelected} />
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
      {/* <motion.section className='mt-8' {...setTransition({ delayIn: 0.6 })}>
        <SubscribeCard />
      </motion.section> */}
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

const variants: MotionProps = {
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
