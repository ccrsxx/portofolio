import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '@lib/format';
import { Accent } from '@components/ui/accent';
import { BlogStats } from './blog-stats';
import { BlogTag } from './blog-tag';
import type { Blog } from '@lib/types/contents';
import type { CustomTag, ValidTag } from '@lib/types/helper';

const DEFAULT_TAG = 'article' as const;

type BlogCardProps<T extends ValidTag> = CustomTag<T> &
  Blog & {
    isTagSelected?: (tag: string) => boolean;
  };

export function BlogCard<T extends ValidTag = typeof DEFAULT_TAG>({
  tag = DEFAULT_TAG,
  slug,
  tags,
  title,
  banner,
  readTime,
  publishedAt,
  description,
  isTagSelected,
  ...rest
}: BlogCardProps<T>): JSX.Element {
  const CustomTag: ValidTag = tag;

  const techTags = tags.split(',');

  return (
    <CustomTag className='grid' {...rest}>
      <Link
        className='clickable bg-white dark:bg-dark-background'
        href={`/blog/${slug}`}
      >
        <div className='relative'>
          <Image
            className='h-36 rounded-t-md object-cover'
            src={banner}
            alt={title}
            placeholder='blur'
          />
          <ul className='absolute bottom-0 flex w-full justify-end gap-2 p-2'>
            {techTags.map((tag) => (
              <BlogTag
                className='bg-opacity-80 dark:bg-opacity-60'
                tag='li'
                key={tag}
              >
                {isTagSelected && isTagSelected(tag) ? (
                  <Accent>{tag}</Accent>
                ) : (
                  tag
                )}
              </BlogTag>
            ))}
          </ul>
        </div>
        <section className='p-4 [&>div]:mt-1'>
          <h3 className='text-lg font-bold text-gray-800 dark:text-gray-100'>
            {title}
          </h3>
          <BlogStats slug={slug} readTime={readTime} />
          <p className='mt-4 text-sm font-bold text-gray-800 dark:text-gray-100'>
            {formatDate(publishedAt)}
          </p>
          <p className='mt-2 text-sm text-gray-600 dark:text-gray-300'>
            {description}
          </p>
        </section>
      </Link>
    </CustomTag>
  );
}
