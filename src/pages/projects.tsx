import { SEO } from '@components/common/seo';
import { ProjectCard } from '@components/projects/project-card';
import { Accent } from '@components/ui/accent';
import { getAllContents } from '@lib/mdx';
import { setTransition } from '@lib/transition';
import type { Project } from '@lib/types/contents';
import { motion } from 'framer-motion';
import type { GetStaticPropsResult, InferGetStaticPropsType } from 'next/types';

export default function Projects({
  projects
}: InferGetStaticPropsType<typeof getStaticProps>): React.JSX.Element {
  return (
    <main className='grid min-h-screen content-start gap-6'>
      <SEO
        title='Projects'
        description='A showcase of my projects on the web development.'
      />
      <header className='grid gap-2'>
        <motion.h1
          className='text-3xl font-bold md:text-5xl'
          {...setTransition()}
        >
          <Accent>Projects</Accent>
        </motion.h1>
        <motion.p
          className='text-secondary'
          {...setTransition({ delayIn: 0.1 })}
        >
          A showcase of my projects on the web development.
        </motion.p>
      </header>
      <motion.ul className='card-layout' {...setTransition({ delayIn: 0.2 })}>
        {projects.map((project) => (
          <li key={project.slug}>
            <ProjectCard {...project} />
          </li>
        ))}
      </motion.ul>
    </main>
  );
}

type BlogProps = {
  projects: Project[];
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
