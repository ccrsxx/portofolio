import { StatisticsCard } from '@components/statistics/statistics-card';
import { Table } from '@components/statistics/table';
import { PageTransition } from '@components/transitions/page-transition';
import { Accent } from '@components/ui/accent';
import { getContentsDataByType, getContentsStatistics } from '@lib/api';
import { generatePageMetadata } from '@lib/metadata';
import type { ContentColumn, ContentStatistics } from '@lib/types/statistics';
import type { Metadata } from 'next';

export const metadata: Metadata = generatePageMetadata({
  title: 'Statistics',
  description: 'A statistics page by Risal Amin.',
  pathname: '/statistics'
});

export const revalidate = 60;

export default async function Statistics(): Promise<React.JSX.Element> {
  let blogData: ContentColumn[] = [];
  let projectsData: ContentColumn[] = [];
  let blogStatistics: ContentStatistics = {
    type: 'blog',
    totalPosts: 0,
    totalViews: 0,
    totalLikes: 0
  };
  let projectsStatistics: ContentStatistics = {
    type: 'project',
    totalPosts: 0,
    totalViews: 0,
    totalLikes: 0
  };

  try {
    blogData = await getContentsDataByType('blog');
    projectsData = await getContentsDataByType('project');
    blogStatistics = await getContentsStatistics('blog');
    projectsStatistics = await getContentsStatistics('project');
  } catch (error) {
    console.error('statistics ssr error', error);
  }

  return (
    <PageTransition>
      <main className='grid min-h-screen content-start gap-6'>
        <header className='grid gap-2'>
          <h1 className='text-3xl font-bold md:text-5xl animate-enter-y'>
            <Accent>Statistics</Accent>
          </h1>
          <p className='text-secondary animate-enter-y animate-enter-delay-100'>
            A statistics from blog and projects.
          </p>
        </header>
        <ul
          className='grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-4 
                     animate-enter-y animate-enter-delay-200'
        >
          <StatisticsCard {...blogStatistics} />
          <StatisticsCard {...projectsStatistics} />
        </ul>
        <section className='grid gap-4 animate-enter-y animate-enter-delay-200'>
          <h2 className='text-2xl font-bold capitalize'>Blog</h2>
          <div>
            <Table data={blogData} />
          </div>
        </section>
        <section className='grid gap-4 animate-enter-y animate-enter-delay-300'>
          <h2 className='text-2xl font-bold capitalize'>Projects</h2>
          <div>
            <Table data={projectsData} />
          </div>
        </section>
      </main>
    </PageTransition>
  );
}
