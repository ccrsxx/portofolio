import { PageTransition } from '@components/transitions/page-transition';
import {
  getAllBlogWithViews,
  getContentsDataByType,
  type BlogWithViews
} from '@lib/api';
import { getContentTags as getBlogTags } from '@lib/helper';
import { generatePageMetadata } from '@lib/metadata';
import type { Metadata } from 'next';
import { BlogClient } from './blog-client';

export const metadata: Metadata = generatePageMetadata({
  title: 'Blog',
  description:
    'A blog by Risal Amin. My thoughts on the web, tech, and everything in between.',
  pathname: '/blog'
});

export const revalidate = 60;

export default async function Blog(): Promise<React.JSX.Element> {
  let blog: BlogWithViews[] = [];
  let tags: string[] = [];

  try {
    const contents = await getContentsDataByType('blog');
    blog = await getAllBlogWithViews(contents);
    tags = getBlogTags(blog);
  } catch (error) {
    console.error('blog ssr error', error);
  }

  return (
    <PageTransition>
      <BlogClient blog={blog} tags={tags} />
    </PageTransition>
  );
}
