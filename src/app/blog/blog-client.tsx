'use client';

import { BlogCard } from '@components/blog/blog-card';
import {
  SortListbox,
  sortOptions,
  type SortOption
} from '@components/blog/sort-listbox';
import { Accent } from '@components/ui/accent';
import { ContentTag } from '@components/ui/content-tag';
import type { BlogWithViews } from '@lib/api';
import { getContentTags as getBlogTags, textIncludes } from '@lib/helper';
import { useSessionStorage } from '@lib/hooks/use-session-storage';
import { setTransition } from '@lib/transition';
import { AnimatePresence, motion, type MotionProps } from 'motion/react';
import { useState, type ChangeEvent } from 'react';

type BlogClientProps = {
  tags: string[];
  blog: BlogWithViews[];
};

export function BlogClient({ tags, blog }: BlogClientProps): React.JSX.Element {
  const [sortOrder, setSortOrder] = useSessionStorage<SortOption>(
    'sortOrder',
    sortOptions[0]
  );

  const [search, setSearch] = useState('');

  const splittedSearch = search.split(' ');

  const filteredPosts = blog.filter(({ title, description, tags }) => {
    const isTitleMatch = textIncludes(title, search);
    const isDescriptionMatch = textIncludes(description, search);
    const isTagsMatch = splittedSearch.every((tag) => tags.includes(tag));

    return isTitleMatch || isDescriptionMatch || isTagsMatch;
  });

  const handleSearchChange = ({
    target: { value }
  }: ChangeEvent<HTMLInputElement>): void => {
    setSearch(value);
  };

  const handleTagClick = (tag: string) => (): void => {
    let newSearch: string;

    if (search.includes(tag)) {
      const poppedTagSearch = search
        .split(' ')
        .filter((t) => t !== tag)
        .join(' ');

      newSearch = poppedTagSearch;
    } else {
      const appendedTagSearch = search ? `${search.trim()} ${tag}` : tag;

      newSearch = appendedTagSearch;
    }

    setSearch(newSearch);
  };

  if (sortOrder === 'date') filteredPosts.sort();
  else filteredPosts.sort((a, b) => b.views - a.views);

  const filteredTags = getBlogTags(filteredPosts);

  const isTagSelected = (tag: string): boolean => {
    const isInFilteredTags = filteredTags.includes(tag);
    const isInSearch = search.toLowerCase().split(' ').includes(tag);

    return isInFilteredTags && isInSearch;
  };

  return (
    <main className='min-h-screen'>
      <header className='grid gap-2'>
        <h1 className='text-3xl font-bold md:text-5xl'>
          <Accent>Blog</Accent>
        </h1>
        <p className='text-secondary'>
          My thoughts on the web, tech, and everything in between.
        </p>
      </header>
      <section className='mt-2'>
        <div>
          <input
            className='custom-input mt-2 w-full'
            type='text'
            value={search}
            placeholder='Search blog...'
            onChange={handleSearchChange}
          />
        </div>
        <div className='mt-2 flex flex-wrap items-center gap-2'>
          <p className='text-secondary text-sm font-medium'>Choose topic:</p>
          <ul className='flex flex-wrap items-center gap-2'>
            {tags.map((tag) => (
              <li key={tag}>
                <ContentTag
                  className='smooth-tab'
                  disabled={!filteredTags.includes(tag)}
                  onClick={handleTagClick(tag)}
                >
                  {isTagSelected(tag) ? <Accent>{tag}</Accent> : tag}
                </ContentTag>
              </li>
            ))}
          </ul>
        </div>
        <div className='mt-4'>
          <SortListbox sortOrder={sortOrder} onSortOrderChange={setSortOrder} />
        </div>
      </section>
      <ul className='mt-4 card-layout'>
        <AnimatePresence mode='popLayout'>
          {filteredPosts.length ? (
            <AnimatePresence>
              {filteredPosts.map((post) => (
                <motion.li
                  {...variants}
                  className='grid'
                  layout='position'
                  key={post.title}
                >
                  <BlogCard {...post} isTagSelected={isTagSelected} />
                </motion.li>
              ))}
            </AnimatePresence>
          ) : (
            <motion.li
              className='text-center text-3xl font-bold col-span-full'
              {...setTransition({ delayIn: 0.2 })}
              key='not-found'
            >
              <Accent>Sorry, not found :&#40;</Accent>
            </motion.li>
          )}
        </AnimatePresence>
      </ul>
    </main>
  );
}

const variants: MotionProps = {
  // initial: { opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1
  },
  exit: {
    scale: 0.9,
    opacity: 0
  }
};
