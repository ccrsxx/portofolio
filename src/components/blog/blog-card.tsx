import { Accent } from '@components/ui/accent';
import type { BlogWithViews } from '@lib/api';
import { formatDate } from '@lib/format';
import type { Blog } from '@lib/types/contents';
import Image from 'next/image';
import Link from 'next/link';
import { ContentTag } from '../ui/content-tag';
import { BlogStats } from './blog-stats';

type BlogCardProps = Blog &
  Partial<Pick<BlogWithViews, 'views'>> & {
    isTagSelected?: (tag: string) => boolean;
  };

export function BlogCard({
  slug,
  tags,
  title,
  banner,
  readTime,
  bannerAlt,
  publishedAt,
  description,
  views: _views,
  bannerLink: _bannerLink,
  isTagSelected
}: BlogCardProps): React.JSX.Element {
  bannerAlt ??= title;

  const techTags = tags.split(',');

  return (
    <article className='grid'>
      <Link className='clickable' href={`/blog/${slug}`}>
        <div className='relative'>
          <Image
            className='h-36 w-full rounded-t-md object-cover'
            src={banner}
            alt={bannerAlt}
            title={bannerAlt}
            placeholder='blur'
          />
          <ul className='absolute bottom-0 flex w-full justify-end gap-2 p-2'>
            {techTags.map((tag) => (
              <ContentTag className='opacity-80' tag='li' key={tag}>
                {isTagSelected && isTagSelected(tag) ? (
                  <Accent>{tag}</Accent>
                ) : (
                  tag
                )}
              </ContentTag>
            ))}
          </ul>
        </div>
        <div className='p-4 [&>div]:mt-1'>
          <p className='text-primary text-lg font-bold'>{title}</p>
          <BlogStats slug={slug} readTime={readTime} />
          <p className='text-primary mt-4 text-sm font-bold'>
            {formatDate(publishedAt)}
          </p>
          <p className='text-secondary mt-2 text-sm'>{description}</p>
        </div>
      </Link>
    </article>
  );
}
