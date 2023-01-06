import { motion } from 'framer-motion';
import { getAllContents } from '@lib/mdx';
import { SEO } from '@components/common/seo';
import { ProjectCard } from '@components/project/project-card';
import { Accent } from '@components/ui/accent';
import type { GetStaticPropsResult, InferGetStaticPropsType } from 'next/types';
import type { Variants } from 'framer-motion';
import type { ProjectWithMeta } from '@lib/types/contents';

const item: Variants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 50 }
};

export default function Projects({
  projects
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
        title='Projects | Risal Amin'
        description='A showcase of my projects on the web development.'
      />
      <section className='grid gap-2'>
        <h1 className='pb-1 text-5xl font-bold'>
          <Accent>Projects</Accent>
        </h1>
        <p className='text-gray-600 dark:text-gray-300'>
          A showcase of my projects on the web development.
        </p>
      </section>
      <section className='mt-4 grid grid-cols-3 gap-4'>
        {projects.map((post) => (
          <ProjectCard {...post} key={post.title} />
        ))}
      </section>
    </motion.main>
  );
}

type BlogProps = {
  projects: ProjectWithMeta[];
};

export async function getStaticProps(): Promise<
  GetStaticPropsResult<BlogProps>
> {
  const projects = await getAllContents('projects');

  return { props: { projects } };
}
