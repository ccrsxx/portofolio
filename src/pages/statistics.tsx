import { motion } from 'framer-motion';
import { formatNumber } from '@lib/format';
import { setTransition } from '@lib/transition';
import { getAllContentsData, getAllContentsStatistics } from '@lib/api';
import { SEO } from '@components/common/seo';
import { Accent } from '@components/ui/accent';
import { Table } from '@components/statistics/table';
import type { InferGetStaticPropsType, GetStaticPropsResult } from 'next/types';
import type { ContentData, ContentStatistics } from '@lib/types/statistics';

export default function Statistics({
  contentsData,
  contentsStatistics
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
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
          className='text-gray-600 dark:text-gray-300'
          {...setTransition({ delayIn: 0.1 })}
        >
          A statistics from blog and projects.
        </motion.p>
      </section>
      <motion.section
        className='grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-4'
        {...setTransition({ delayIn: 0.2 })}
      >
        {contentsStatistics.map(
          ({ type, totalPosts, totalViews, totalLikes }) => (
            <article
              className='main-border grid gap-2 rounded-md p-4 text-center'
              key={type}
            >
              <h2 className='text-2xl font-bold capitalize'>{type}</h2>
              <div className='grid gap-1 [&>p>span]:text-lg [&>p>span]:font-semibold'>
                <p>
                  <span>{formatNumber(totalPosts)}</span> Posts
                </p>
                <p>
                  <span>{formatNumber(totalViews)}</span> views
                </p>
                <p>
                  <span>{formatNumber(totalLikes)}</span> likes
                </p>
              </div>
            </article>
          )
        )}
      </motion.section>
      {contentsData.map(({ type, data }, index) => (
        <motion.section className='grid gap-4' key={type}>
          <motion.h2
            className='text-2xl font-bold capitalize'
            {...setTransition({ delayIn: 0.3 + index / 10 })}
          >
            {type}
          </motion.h2>
          <motion.section {...setTransition({ delayIn: 0.4 + index / 10 })}>
            <Table data={data} />
          </motion.section>
        </motion.section>
      ))}
    </main>
  );
}

type StatisticsProps = {
  contentsData: ContentData[];
  contentsStatistics: ContentStatistics[];
};

export async function getStaticProps(): Promise<
  GetStaticPropsResult<StatisticsProps>
> {
  const contentsData = await getAllContentsData();
  const contentsStatistics = await getAllContentsStatistics();

  return {
    props: {
      contentsData,
      contentsStatistics
    },
    revalidate: 60
  };
}
