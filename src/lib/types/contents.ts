import type { StaticImageData } from 'next/image';

export type Blog = {
  slug: string;
  tags: string;
  title: string;
  banner: StaticImageData;
  readTime: string;
  description: string;
  publishedAt: string;
  lastUpdatedAt?: string;
};

export type Project = {
  slug: string;
  link?: string;
  title: string;
  techs: string;
  banner: StaticImageData;
  github?: string;
  youtube?: string;
  readTime: string;
  description: string;
  publishedAt: string;
  lastUpdatedAt?: string;
};

export type InjectedMeta = {
  views: number;
  likes?: number;
};

export type ContentType = 'blog' | 'projects';

export type BlogWithMeta = Blog & InjectedMeta;
export type ProjectWithMeta = Project & InjectedMeta;
