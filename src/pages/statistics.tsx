import { formatNumber } from '@lib/format';
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
    <main className='grid min-h-screen content-start gap-6 py-12'>
      <SEO
        title='Statistics | Risal Amin'
        description='A statistics page by Risal Amin.'
      />
      <section className='grid gap-2'>
        <h1 className='text-5xl font-bold'>
          <Accent>Statistics</Accent>
        </h1>
        <p className='text-gray-600 dark:text-gray-300'>
          A statistics from blog and projects.
        </p>
      </section>
      <section className='grid grid-cols-2 gap-6'>
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
      </section>
      {contentsData.map(({ type, data }) => (
        <section className='grid gap-4' key={type}>
          <h2 className='text-2xl font-bold capitalize'>{type}</h2>
          <Table data={data} />
        </section>
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
