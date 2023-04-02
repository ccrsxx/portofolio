import type { Session, User } from 'next-auth';
import type { ContentType } from './contents';

type SlugEndPoints = 'views' | 'likes' | 'guestbook';

type ApiEndpoints =
  | 'spotify'
  | 'contents'
  | 'guestbook'
  | `contents/${ContentType}`
  | `${SlugEndPoints}/${string}`;

export type ValidApiEndpoints = `/api/${ApiEndpoints}`;

type CustomUser = Record<keyof NonNullable<User>, string> & {
  admin: boolean;
  username: string;
};

export type CustomSession = Session & {
  user: CustomUser;
};
