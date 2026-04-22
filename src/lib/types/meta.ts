import type { ContentType } from './contents';

export type ContentMeta = {
  slug: string;
  type: ContentType;
  views: number;
  likes: number;
};

export type Views = {
  views: number;
};

export type LikeStatus = {
  likes: number;
  userLikes: number;
};
