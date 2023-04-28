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

type DefaultUser = Omit<User, 'id'>;

export type AssertedUser = Record<keyof NonNullable<DefaultUser>, string>;

type CustomUser = AssertedUser & {
  id: string;
  admin: boolean;
  username: string;
};

export type CustomSession = Session & {
  user: CustomUser;
};
