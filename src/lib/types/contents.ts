import type { StaticImageData } from 'next/image';

export type Content = {
  slug: string;
  title: string;
  banner: StaticImageData;
  readTime: string;
  description: string;
  publishedAt: string;
  lastUpdatedAt?: string;
};

export type Blog = Content & {
  tags: string;
  bannerAlt?: string;
  bannerLink?: string;
};

export type Project = Content & {
  link?: string;
  techs: string;
  github?: string;
  youtube?: string;
  category?: string;
};

export type ContentType = 'blog' | 'projects';
