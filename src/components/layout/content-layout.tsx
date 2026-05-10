import { BlogCard } from '@components/blog/blog-card';
import { BlogStats } from '@components/blog/blog-stats';
import { SEO, type Article } from '@components/common/seo';
import { LikesCounter } from '@components/content/likes-counter';
import { components } from '@components/content/mdx-components';
import { TableOfContents } from '@components/content/table-of-contents';
import { CustomLink } from '@components/link/custom-link';
import { UnstyledLink } from '@components/link/unstyled-link';
import { ImagePreview } from '@components/modal/image-preview';
import { ProjectCard } from '@components/projects/project-card';
import { ProjectStats } from '@components/projects/project-stats';
import { Accent } from '@components/ui/accent';
import { formatDate } from '@lib/format';
import { convertContentTypeToPathContentType } from '@lib/helper';
import type { ContentSlugProps } from '@lib/mdx';
import { setTransition } from '@lib/transition';
import type { Blog, Content, Project } from '@lib/types/contents';
import { MDXProvider } from '@mdx-js/react';
import { motion } from 'framer-motion';
import type { ReactElement } from 'react';
import { MdHistory } from 'react-icons/md';

type ContentLayoutProps = {
  children: ReactElement<ContentSlugProps>;
  meta: Pick<
    Content,
    'title' | 'tags' | 'publishedAt' | 'description' | 'banner'
  > &
    Pick<Blog, 'bannerAlt' | 'bannerLink'> &
    Pick<Project, 'link' | 'github' | 'youtube' | 'category'>;
};

export function ContentLayout({
  meta,
  children
}: ContentLayoutProps): React.JSX.Element {
  const [
    { title, description, publishedAt, banner, bannerAlt, bannerLink, tags },
    { type, slug, readTime, lastUpdatedAt, suggestedContents }
  ] = [meta, children.props];

  const parsedType = convertContentTypeToPathContentType(type);

  const contentIsBlog = type === 'blog';

  const githubCommitHistoryUrl = `https://github.com/ccrsxx/portofolio/commits/main/src/pages/${parsedType}/${slug}.mdx`;
  const githubContentUrl = `https://github.com/ccrsxx/portofolio/blob/main/src/pages/${parsedType}/${slug}.mdx`;

  const article: Article = {
    type: parsedType,
    tags,
    banner,
    publishedAt,
    lastUpdatedAt
  };

  return (
    <motion.main className='pt-0' {...setTransition({ distance: 25 })}>
      <SEO title={title} description={description} article={article} />
      <ImagePreview
        className='max-h-112 object-cover'
        wrapperClassName='mt-0.5'
        src={banner}
        alt={bannerAlt ?? title}
        customLink={bannerLink}
      />
      <article>
        <header className='mt-8 grid gap-2'>
          <h1 className='text-2xl font-bold md:text-4xl'>{title}</h1>
          <p className='text-secondary text-sm'>
            Written on {formatDate(publishedAt)} by Risal Amin
          </p>
          {lastUpdatedAt && (
            <div className='text-primary flex items-center gap-2 text-sm'>
              <p>Last updated on {formatDate(lastUpdatedAt)}.</p>
              <UnstyledLink
                className='smooth-tab hover:text-accent-main flex items-center gap-1 transition-colors'
                href={githubCommitHistoryUrl}
              >
                <MdHistory className='text-lg' />
                View history
              </UnstyledLink>
            </div>
          )}
          <div className='mt-4 grid gap-2'>
            {contentIsBlog ? (
              <BlogStats slug={slug} readTime={readTime} increment />
            ) : (
              <ProjectStats
                slug={slug}
                readTime={readTime}
                increment
                {...meta}
              />
            )}
          </div>
        </header>
        <hr className='border-border mt-4' />
        <section className='mt-4 grid gap-8 lg:grid-cols-[auto_1fr]'>
          <div id='mdx-article' className='prose dark:prose-invert max-w-4xl'>
            <MDXProvider components={components}>{children}</MDXProvider>
          </div>
          <TableOfContents>
            <LikesCounter slug={slug} />
          </TableOfContents>
        </section>
        <section className='mt-20 grid gap-4'>
          <h2 className='text-2xl font-bold md:text-4xl'>
            <Accent>
              Other {contentIsBlog ? 'posts' : parsedType} you might like
            </Accent>
          </h2>
          <ul className='card-layout'>
            {contentIsBlog
              ? (suggestedContents as Blog[]).map((suggestedContent) => (
                  <li className='grid' key={suggestedContent.slug}>
                    <BlogCard {...suggestedContent} />
                  </li>
                ))
              : (suggestedContents as Project[]).map((suggestedContent) => (
                  <li key={suggestedContent.slug}>
                    <ProjectCard {...suggestedContent} />
                  </li>
                ))}
          </ul>
        </section>
        <nav>
          <ul className='mt-8 flex justify-between font-medium'>
            <li>
              <CustomLink href={`/${parsedType}`}>
                ← Back to {parsedType}
              </CustomLink>
            </li>
            <li>
              <CustomLink href={githubContentUrl}>
                Edit this on GitHub
              </CustomLink>
            </li>
          </ul>
        </nav>
      </article>
    </motion.main>
  );
}
