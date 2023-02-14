import type { Session } from 'next-auth';
import type { ContentType } from './contents';

type SlugEndPoints = 'views' | 'likes' | 'guestbook';

type ApiEndpoints =
  | 'contents'
  | 'guestbook'
  | `contents/${ContentType}`
  | `${SlugEndPoints}/${string}`;

export type ValidApiEndpoints = `/api/${ApiEndpoints}`;

type CustomUser = Record<keyof NonNullable<Session['user']>, string> & {
  username: string;
};

export type CustomSession = Session & {
  user: CustomUser;
};
