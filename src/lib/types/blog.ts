import type { StaticImageData } from 'next/image';

/* List of currently disabled props:
  - slug
  - views
  - likes
  - banner
  - readTime
  - publishedAt 
  */

export type Blog = {
  slug: string;
  tags: string;
  link?: string;
  title: string;
  image: StaticImageData;
  views: number;
  likes?: number;
  banner?: StaticImageData;
  readTime: string;
  description: string;
  publishedAt: string;
  lastUpdatedAt?: string;
};
