import Link from 'next/link';
import Image from 'next/image';
import { TechIcons } from '@components/ui/tech-icons';
import type { Project } from '@lib/types/project';

export function ProjectCard({
  slug,
  title,
  techs,
  image,
  description
}: Project): JSX.Element {
  return (
    <article className='grid' key={title}>
      <Link className='clickable p-4' href={`/projects/${slug}`}>
        <h3 className='text-xl font-bold'>{title}</h3>
        <p className='text-sm text-gray-700 dark:text-gray-300'>
          {description}
        </p>
        <TechIcons className='mt-2' techs={techs} />
        <Image
          className='mt-3 rounded'
          src={image}
          alt={title}
          placeholder='blur'
        />
      </Link>
    </article>
  );
}
