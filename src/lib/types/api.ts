import type { ContentType } from './contents';

type SlugEndPoints = 'views' | 'likes';

type ApiEndpoints =
  | 'contents'
  | `contents/${ContentType}`
  | `${SlugEndPoints}/${string}`;

export type ValidApiEndpoints = `/api/${ApiEndpoints}`;
