import Head from 'next/head';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import { PUBLIC_URL } from '@lib/env';
import type { Content, ContentType } from '@lib/types/contents';

export type Article = Pick<
  Content,
  'tags' | 'banner' | 'publishedAt' | 'lastUpdatedAt'
> & {
  type: ContentType;
};

type MainLayoutProps = {
  tag?: string;
  title: string;
  image?: string;
  article?: Article;
  description: string;
};

export function SEO({
  title,
  article,
  description
}: MainLayoutProps): JSX.Element {
  const { theme } = useTheme();
  const { asPath } = useRouter();

  const ogImageQuery = new URLSearchParams();

  ogImageQuery.set('title', title);
  ogImageQuery.set('description', description ?? 'Description');

  const { type, tags, banner, publishedAt, lastUpdatedAt } = article ?? {};

  if (article) {
    ogImageQuery.set('type', type as string);
    ogImageQuery.set('article', 'true');
    ogImageQuery.set('image', PUBLIC_URL + (banner?.src as string));
  }

  const isHomepage = asPath === '/';
  const isDarkMode = theme === 'dark';

  const { colorScheme, themeColor } = systemTheme[+isDarkMode];

  const ogTitle = `${title} | ${
    isHomepage ? 'Fullstack Developer' : 'Risal Amin'
  }`;

  const ogImageUrl = `${PUBLIC_URL}/api/og?${ogImageQuery.toString()}`;

  const ogUrl = `${PUBLIC_URL}${isHomepage ? '' : asPath}`;

  return (
    <Head>
      <title>{ogTitle}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={tags} />
      <meta name='color-scheme' content={colorScheme} />
      <meta name='theme-color' content={themeColor} />
      <meta name='author' content='Risal Amin' />
      <meta name='generator' content='Next.js' />
      <meta name='twitter:title' content={ogTitle} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={ogImageUrl} />
      <meta name='twitter:image:alt' content={ogTitle} />
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:site' content='@ccrsxx' />
      <meta name='twitter:creator' content='@ccrsxx' />
      <meta property='og:title' content={ogTitle} />
      <meta property='og:description' content={description} />
      <meta property='og:url' content={ogUrl} />
      <meta property='og:image' content={ogImageUrl} />
      <meta property='og:image:alt' content={ogTitle} />
      <meta property='og:image:type' content='image/png' />
      <meta property='og:image:width' content='1200' />
      <meta property='og:image:height' content='600' />
      <meta property='og:locale' content='en_US' />
      <meta property='og:site_name' content='risalamin.com' />
      <meta property='og:determiner' content='auto' />
      {article ? (
        <>
          <meta property='og:type' content='article' />
          <meta property='og:section' content='Programming' />
          <meta property='article:author' content='Risal Amin' />
          <meta property='article:published_time' content={publishedAt} />
          {tags
            ?.split(',')
            .map((tag) => (
              <meta property='article:tag' content={tag} key={tag} />
            ))}
          {lastUpdatedAt && (
            <meta property='article:modified_time' content={lastUpdatedAt} />
          )}
        </>
      ) : (
        <meta property='og:type' content='website' />
      )}
    </Head>
  );
}

type SystemTheme = {
  themeColor: string;
  colorScheme: 'dark' | 'light';
};

const systemTheme: SystemTheme[] = [
  {
    themeColor: '#FFFFFF',
    colorScheme: 'light'
  },
  {
    themeColor: '#222222',
    colorScheme: 'dark'
  }
];
