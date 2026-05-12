import type { Metadata } from 'next';
import {
  generateSlugMetadata,
  generateSlugStaticParams,
  SlugPage
} from '../../content-slug';

export function generateStaticParams(): Promise<{ slug: string }[]> {
  return generateSlugStaticParams('projects');
}

export function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return generateSlugMetadata('projects', params);
}

export default function ProjectPost({
  params
}: {
  params: Promise<{ slug: string }>;
}): React.JSX.Element {
  return <SlugPage type='projects' params={params} />;
}
