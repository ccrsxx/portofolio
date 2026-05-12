import type { Metadata } from 'next';
import {
  generateSlugMetadata,
  generateSlugStaticParams,
  SlugPage
} from '../../content-slug';

export function generateStaticParams(): Promise<{ slug: string }[]> {
  return generateSlugStaticParams('blog');
}

export function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return generateSlugMetadata('blog', params);
}

export default function BlogPost({
  params
}: {
  params: Promise<{ slug: string }>;
}): React.JSX.Element {
  return <SlugPage type='blog' params={params} />;
}
