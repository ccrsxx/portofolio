import FirstPost from '/public/assets/blogs/custom-layout-in-nextjs.webp';
import SecondPost from '/public/assets/blogs/data-fetching-in-nextjs.webp';
import TwitterClone from '/public/assets/projects/twitter-clone.webp';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { SEO } from '@components/common/seo';
import { ReactIcon } from '@components/ui/react-icon';
import { BlogCard } from '@components/blog/blog-card';
import { ProjectCard } from '@components/project/project-card';
import type { Variant } from 'framer-motion';
import type { Project, BlogWithMeta } from '@lib/types/contents';

type IndexVariants = Record<'hidden' | 'show' | 'exit', Variant>;

const container: IndexVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  },
  exit: { opacity: 0 }
};

const item: IndexVariants = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 50 }
};

export default function Home(): JSX.Element {
  return (
    <main>
      <SEO
        title='Risal Amin - Web Developer'
        description='An online portfolio and blog by Risal Amin. Showcase some of my past projects and some of my thoughts on the world of web development.'
      />
      <motion.section
        className='min-h-screen pt-32'
        variants={container}
        initial='hidden'
        animate='show'
        exit='exit'
      >
        <motion.h2
          className='text-5xl font-bold transition-colors delay-100'
          variants={item}
        >
          Hi!
        </motion.h2>
        <motion.h1
          className='mt-1 text-6xl font-bold transition-colors delay-200'
          variants={item}
        >
          You can call me <span className='gradient-title'>Risal</span>
        </motion.h1>
        <motion.p
          className='mt-6 max-w-4xl text-xl text-gray-700 transition-colors 
                     delay-[400ms] dark:text-gray-200'
          variants={item}
        >
          I&apos;m a self-taught developer, who&apos;s currently pursuing a
          Full-Stack development to create stunning user experiences on the
          front-end, scalable, and secure infrastructure on the backend.
        </motion.p>
        <motion.section className='mt-8 flex gap-4' variants={item}>
          <Link className='custom-button clickable' href='/blog'>
            Read my blog
          </Link>
          <Link className='custom-button clickable' href='/about'>
            Learn more about me
          </Link>
        </motion.section>
        <motion.section className='mt-8 flex gap-4' variants={item}>
          <a
            className='group flex items-center gap-2 text-gray-600 transition-colors
                       hover:text-black dark:text-gray-400 dark:hover:text-white'
            href='https://drive.google.com'
          >
            <ReactIcon
              className='h-4 w-4 transition-colors group-hover:text-accent-blue'
              iconName='HiDocumentText'
            />{' '}
            Resume
          </a>
          <a
            className='group flex items-center gap-2 text-gray-600 transition-colors
                       hover:text-black dark:text-gray-400 dark:hover:text-white'
            href='https://twitter/ccrsxx'
          >
            <ReactIcon
              className='h-4 w-4 transition-colors group-hover:text-[#1d9bf0]'
              iconName='SiTwitter'
            />{' '}
            Twitter
          </a>
          <a
            className='flex items-center gap-2 text-gray-600 transition-colors
                       hover:text-black dark:text-gray-400 dark:hover:text-white'
            href='https://github.com/ccrsxx'
          >
            <ReactIcon className='h-4 w-4' iconName='SiGithub' /> Github
          </a>
        </motion.section>
      </motion.section>
      <section className='grid gap-4 py-20'>
        <h2 className='gradient-heading text-4xl font-bold'>Featured Posts</h2>
        <section className='grid grid-cols-3 gap-4'>
          {blogList.map((blog, index) => (
            <BlogCard {...blog} key={index} />
          ))}
        </section>
        <Link
          className='custom-button clickable justify-self-center font-bold text-gray-600 dark:text-gray-300'
          href='/blog'
        >
          See more posts
        </Link>
      </section>
      <section className='grid gap-4 py-20'>
        <h2 className='gradient-heading text-4xl font-bold'>
          Featured Project
        </h2>
        <p className='-mt-2 text-gray-600 dark:text-gray-300'>
          Some projects I&apos;m proud of
        </p>
        <section className='grid grid-cols-3 gap-4'>
          {projectList.map((project, index) => (
            <ProjectCard {...project} key={index} />
          ))}
        </section>
        <Link
          className='custom-button clickable justify-self-center font-bold text-gray-600 dark:text-gray-300'
          href='/projects'
        >
          See more projects
        </Link>
      </section>
    </main>
  );
}

const blogList: BlogWithMeta[] = [
  {
    slug: 'first-post',
    tags: 'Next.js,Tailwind CSS,Firebase',
    views: 12_000,
    title: 'First Post',
    banner: FirstPost,
    readTime: '5 min read',
    publishedAt: '2022-12-15',
    description:
      'This is my first post. I will be writing about my journey as a developer and some of the things I have learned along the way. I hope you enjoy it.'
  },
  {
    slug: 'first-post',
    tags: 'Next.js,Tailwind CSS,Firebase',
    views: 12_000,
    title: 'First Post',
    banner: FirstPost,
    readTime: '5 min read',
    publishedAt: '2022-12-15',
    description:
      'This is my first post. I will be writing about my journey as a developer and some of the things I have learned along the way. I hope you enjoy it.'
  },
  {
    slug: 'first-post',
    tags: 'Next.js,Tailwind CSS,Firebase',
    views: 12_000,
    title: 'First Post',
    banner: FirstPost,
    readTime: '5 min read',
    publishedAt: '2022-12-15',
    description:
      'This is my first post. I will be writing about my journey as a developer and some of the things I have learned along the way. I hope you enjoy it.'
  },
  {
    slug: 'first-post',
    tags: 'Next.js,Tailwind CSS,Firebase',
    views: 12_000,
    title: 'First Post',
    banner: SecondPost,
    readTime: '5 min read',
    publishedAt: '2022-12-15',
    description:
      'This is my first post. I will be writing about my journey as a developer and some of the things I have learned along the way. I hope you enjoy it.'
  },
  {
    slug: 'first-post',
    tags: 'Next.js,Tailwind CSS,Firebase',
    views: 12_000,
    title: 'First Post',
    banner: SecondPost,
    readTime: '5 min read',
    publishedAt: '2022-12-15',
    description:
      'This is my first post. I will be writing about my journey as a developer and some of the things I have learned along the way. I hope you enjoy it.'
  },
  {
    slug: 'first-post',
    tags: 'Next.js,Tailwind CSS,Firebase',
    views: 12_000,
    title: 'First Post',
    banner: SecondPost,
    readTime: '5 min read',
    publishedAt: '2022-12-15',
    description:
      'This is my first post. I will be writing about my journey as a developer and some of the things I have learned along the way. I hope you enjoy it.'
  }
];

const projectList: Omit<Project, 'readTime' | 'publishedAt'>[] = [
  {
    slug: 'twitter-clone',
    title: 'Twitter Clone',
    banner: TwitterClone,
    techs: 'react,nextjs,tailwindcss,firebase',
    description:
      'A Twitter clone built with Next.js, Tailwind CSS, and Firebase.'
  },
  {
    slug: 'twitter-clone',
    title: 'Twitter Clone',
    banner: TwitterClone,
    techs: 'react,nextjs,tailwindcss,firebase',
    description:
      'A Twitter clone built with Next.js, Tailwind CSS, and Firebase.'
  },
  {
    slug: 'twitter-clone',
    title: 'Twitter Clone',
    banner: TwitterClone,
    techs: 'react,nextjs,tailwindcss,firebase',
    description:
      'A Twitter clone built with Next.js, Tailwind CSS, and Firebase.'
  }
];
