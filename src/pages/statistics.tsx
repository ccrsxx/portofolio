import { SEO } from '@components/common/seo';
import { StatisticsCard } from '@components/statistics/statistics-card';
import { Table } from '@components/statistics/table';
import { Accent } from '@components/ui/accent';
import { getContentsDataByType, getContentsStatistics } from '@lib/api';
import { setTransition } from '@lib/transition';
import type { ContentColumn, ContentStatistics } from '@lib/types/statistics';
import { motion } from 'framer-motion';
import type { GetStaticPropsResult, InferGetStaticPropsType } from 'next/types';

export default function Statistics({
  blogData,
  projectsData,
  blogStatistics,
  projectsStatistics
}: InferGetStaticPropsType<typeof getStaticProps>): React.JSX.Element {
  return (
    <main className='grid min-h-screen content-start gap-6'>
      <SEO title='Statistics' description='A statistics page by Risal Amin.' />
      <section className='grid gap-2'>
        <motion.h1
          className='text-3xl font-bold md:text-5xl'
          {...setTransition()}
        >
          <Accent>Statistics</Accent>
        </motion.h1>
        <motion.p
          className='text-secondary'
          {...setTransition({ delayIn: 0.1 })}
        >
          A statistics from blog and projects.
        </motion.p>
      </section>
      <motion.section
        className='grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-4'
        {...setTransition({ delayIn: 0.2 })}
      >
        <StatisticsCard {...blogStatistics} />
        <StatisticsCard {...projectsStatistics} />
      </motion.section>
      <motion.section className='grid gap-4'>
        <motion.h2
          className='text-2xl font-bold capitalize'
          {...setTransition({ delayIn: 0.3 + 0 / 10 })}
        >
          Blog
        </motion.h2>
        <motion.section {...setTransition({ delayIn: 0.4 + 0 / 10 })}>
          <Table data={blogData} />
        </motion.section>
      </motion.section>
      <motion.section className='grid gap-4'>
        <motion.h2
          className='text-2xl font-bold capitalize'
          {...setTransition({ delayIn: 0.3 + 1 / 10 })}
        >
          Project
        </motion.h2>
        <motion.section {...setTransition({ delayIn: 0.4 + 1 / 10 })}>
          <Table data={projectsData} />
        </motion.section>
      </motion.section>
    </main>
  );
}

type StatisticsProps = {
  blogData: ContentColumn[];
  projectsData: ContentColumn[];
  blogStatistics: ContentStatistics;
  projectsStatistics: ContentStatistics;
};

export async function getStaticProps(): Promise<
  GetStaticPropsResult<StatisticsProps>
> {
  try {
    const blogData = await getContentsDataByType('blog');
    const projectsData = await getContentsDataByType('project');

    const blogStatistics = await getContentsStatistics('blog');
    const projectsStatistics = await getContentsStatistics('project');

    return {
      props: {
        blogData,
        projectsData,
        blogStatistics,
        projectsStatistics
      },
      revalidate: 60
    };
  } catch (error) {
    console.error('statistics ssr error', error);
    throw error;
  }
}
