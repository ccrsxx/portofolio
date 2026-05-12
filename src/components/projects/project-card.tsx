import { TechIcons } from '@components/projects/tech-icons';
import { MorphTransition } from '@components/transitions/morph-transition';
import type { Project } from '@lib/types/contents';
import Image from 'next/image';
import Link from 'next/link';

export function ProjectCard({
  slug,
  tags,
  title,
  banner,
  description
}: Omit<Project, 'readTime' | 'publishedAt'>): React.JSX.Element {
  return (
    <article className='grid' key={title}>
      <Link className='project-card clickable p-4' href={`/projects/${slug}`}>
        <h3 className='text-xl font-bold'>{title}</h3>
        <p className='text-secondary text-sm'>{description}</p>
        <TechIcons tags={tags} />
        <MorphTransition name={`post-image-${slug}`}>
          <Image
            className='mt-3 h-36 w-full rounded object-cover'
            src={banner}
            alt={title}
            placeholder='blur'
          />
        </MorphTransition>
        <p className='animated-underline mt-2 w-fit'>See more →</p>
      </Link>
    </article>
  );
}
