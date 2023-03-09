import type { ContentType } from './contents';

export type ContentStatistics = {
  type: ContentType;
  posts: number;
  views: number;
  likes: number;
};
