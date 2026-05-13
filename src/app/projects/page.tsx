import { ProjectCard } from '@components/projects/project-card';
import { PageTransition } from '@components/transitions/page-transition';
import { Accent } from '@components/ui/accent';
import { getAllContents } from '@lib/mdx';
import { generatePageMetadata } from '@lib/metadata';
import type { Metadata } from 'next';

export const metadata: Metadata = generatePageMetadata({
  title: 'Projects',
  description: 'A showcase of my projects on the web development.',
  pathname: '/projects'
});

export default async function Projects(): Promise<React.JSX.Element> {
  const projects = await getAllContents('projects');

  return (
    <PageTransition enter='slide-up'>
      <main className='grid min-h-screen content-start gap-6'>
        <header className='grid gap-2'>
          <h1 className='text-3xl font-bold md:text-5xl'>
            <Accent>Projects</Accent>
          </h1>
          <p className='text-secondary'>
            A showcase of my projects on the web development.
          </p>
        </header>
        <ul className='card-layout'>
          {projects.map((project) => (
            <li key={project.slug}>
              <ProjectCard {...project} />
            </li>
          ))}
        </ul>
      </main>
    </PageTransition>
  );
}
