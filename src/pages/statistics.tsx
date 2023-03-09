import { formatNumber } from '@lib/format';
import { SEO } from '@components/common/seo';
import { Accent } from '@components/ui/accent';
import type { ContentStatistics } from '@lib/types/statistics';

export default function Statistics(): JSX.Element {
  return (
    <main className='min-h-screen py-12'>
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
      <section className='mt-6 grid grid-cols-2 gap-6'>
        {contentStatistics.map(({ type, posts, views, likes }) => (
          <article
            className='main-border grid gap-2 rounded-md p-4 text-center'
            key={type}
          >
            <h2 className='text-2xl font-bold capitalize'>{type}</h2>
            <div className='grid gap-1 [&>p>span]:text-lg [&>p>span]:font-semibold'>
              <p>
                <span>{formatNumber(posts)}</span> Posts
              </p>
              <p>
                <span>{formatNumber(views)}</span> views
              </p>
              <p>
                <span>{formatNumber(likes)}</span> likes
              </p>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

const contentStatistics: ContentStatistics[] = [
  {
    type: 'blog',
    posts: 24,
    views: 300_000,
    likes: 9_849
  },
  {
    type: 'projects',
    posts: 11,
    views: 200_000,
    likes: 8_849
  }
];
