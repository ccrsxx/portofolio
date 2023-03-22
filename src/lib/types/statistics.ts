import type { ContentType } from './contents';
import type { ContentMeta } from './meta';

export type ContentStatistics = Pick<ContentMeta, 'type'> & {
  totalPosts: number;
  totalViews: number;
  totalLikes: number;
};

export type ContentColumn = Pick<ContentMeta, 'slug' | 'views' | 'likes'>;

export type ContentData = {
  type: ContentType;
  data: ContentColumn[];
};
