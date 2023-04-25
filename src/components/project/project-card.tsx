import Link from 'next/link';
import Image from 'next/image';
import { TechIcons } from '@components/project/tech-icons';
import type { Project } from '@lib/types/contents';

export function ProjectCard({
  slug,
  tags,
  title,
  banner,
  description
}: Omit<Project, 'readTime' | 'publishedAt'>): JSX.Element {
  return (
    <article className='grid' key={title}>
      <Link className='project-card clickable p-4' href={`/projects/${slug}`}>
        <h3 className='text-xl font-bold'>{title}</h3>
        <p className='text-sm text-gray-700 dark:text-gray-300'>
          {description}
        </p>
        <TechIcons tags={tags} />
        <Image
          className='mt-3 h-44 rounded object-cover'
          src={banner}
          alt={title}
          placeholder='blur'
        />
        <p className='animated-underline mt-2 w-fit'>See more →</p>
      </Link>
    </article>
  );
}
