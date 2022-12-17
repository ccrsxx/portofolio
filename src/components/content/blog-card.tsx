import Link from 'next/link';
import Image from 'next/image';
import { formatNumber } from '@lib/format';
import { ReactIcon } from '@components/ui/react-icon';
import type { Blog } from '@lib/types/blog';

export function BlogCard({
  slug,
  tags,
  views,
  title,
  image,
  readTime,
  publishedAt,
  description
}: Blog): JSX.Element {
  const techTags = tags.split(',');

  return (
    <article className='grid' key={title}>
      <Link className='clickable' href={`/blog/${slug}`}>
        <div className='relative'>
          <Image
            className='h-36 rounded-t-md'
            src={image}
            alt={title}
            placeholder='blur'
          />
          <ul className='absolute bottom-0 flex w-full justify-end gap-2 p-2'>
            {techTags.map((tag) => (
              <li
                className='rounded-md bg-gray-100 bg-opacity-80  px-1.5 py-0.5 font-medium text-gray-700 transition-colors 
                           hover:text-black dark:bg-gray-700 dark:bg-opacity-60 dark:text-gray-200 dark:hover:text-white'
                key={tag}
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
        <section className='p-4'>
          <h3 className='text-lg font-bold text-gray-800 dark:text-gray-100'>
            {title}
          </h3>
          <div className='mt-1 flex gap-4'>
            <div className='flex items-center gap-1'>
              <ReactIcon
                className='h-4 w-4 text-gray-600 dark:text-gray-300'
                iconName='HiClock'
              />
              <p className='gradient-title'>{readTime}</p>
            </div>
            <div className='flex items-center gap-1'>
              <ReactIcon
                className='h-4 w-4 text-gray-600 dark:text-gray-300'
                iconName='HiEye'
              />
              <p className='gradient-title'>{formatNumber(views)} views</p>
            </div>
          </div>
          <p className='mt-4 text-sm font-bold text-gray-800 dark:text-gray-100'>
            {publishedAt}
          </p>
          <p className='mt-2 text-sm text-gray-600 dark:text-gray-300'>
            {description}
          </p>
        </section>
      </Link>
    </article>
  );
}
