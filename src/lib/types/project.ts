import type { StaticImageData } from 'next/image';
import type { ValidTech } from '@components/ui/tech-icons';

/* List of currently disabled props:
  - slug
  - views
  - likes
  - banner
  - readTime
  - publishedAt 
  */

export type Project = {
  slug: string;
  link?: string;
  title: string;
  image: StaticImageData;
  techs: ValidTech[];
  views?: number;
  likes?: number;
  banner?: StaticImageData;
  github?: string;
  youtube?: string;
  readTime?: string;
  description: string;
  publishedAt?: string;
  lastUpdatedAt?: string;
};
