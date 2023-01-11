import { motion } from 'framer-motion';
import { getAllContents } from '@lib/mdx';
import { setTransition } from '@lib/transition';
import { SEO } from '@components/common/seo';
import { ProjectCard } from '@components/project/project-card';
import { Accent } from '@components/ui/accent';
import type { GetStaticPropsResult, InferGetStaticPropsType } from 'next/types';
import type { ProjectWithMeta } from '@lib/types/contents';

export default function Projects({
  projects
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  return (
    <main className='grid gap-6 py-12'>
      <SEO
        title='Projects | Risal Amin'
        description='A showcase of my projects on the web development.'
      />
      <section className='grid gap-2'>
        <motion.h1 className='pb-1 text-5xl font-bold' {...setTransition()}>
          <Accent>Projects</Accent>
        </motion.h1>
        <motion.p
          className='text-gray-600 dark:text-gray-300'
          {...setTransition({ delayIn: 0.1 })}
        >
          A showcase of my projects on the web development.
        </motion.p>
      </section>
      <motion.section
        className='grid grid-cols-3 gap-4'
        {...setTransition({ delayIn: 0.2 })}
      >
        {projects.map((post) => (
          <ProjectCard {...post} key={post.title} />
        ))}
      </motion.section>
    </main>
  );
}

type BlogProps = {
  projects: ProjectWithMeta[];
};

export async function getStaticProps(): Promise<
  GetStaticPropsResult<BlogProps>
> {
  const projects = await getAllContents('projects');

  return {
    props: {
      projects
    }
  };
}
