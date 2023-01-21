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

export type InjectedMeta = {
  views: number;
  likes?: number;
};

export type ContentType = 'blog' | 'projects';

export type BlogWithMeta = Blog & InjectedMeta;
export type ProjectWithMeta = Project & InjectedMeta;
