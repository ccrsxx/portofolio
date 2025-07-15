import type { Session, User } from 'next-auth';
import type { ContentType } from './contents';

type SlugEndPoints = 'views' | 'likes' | 'guestbook';

type NextJsApiEndpoints =
  | '/api/contents'
  | '/api/guestbook'
  | `/api/contents/${ContentType}`
  | `/api/${SlugEndPoints}/${string}`;

type BackendApiEndpoints =
  | `${string}/og`
  | `${string}/spotify/currently-playing`;

export type BackendSuccessApiResponse<T> = {
  data: T | null;
};

export type BackendErrorApiResponse = {
  error: {
    id: string;
    message: string;
    details: string[];
  };
};

export type BackendApiResponse<T = unknown> =
  | BackendSuccessApiResponse<T>
  | BackendErrorApiResponse;

export type ValidApiEndpoints = NextJsApiEndpoints | BackendApiEndpoints;

type DefaultUser = Required<Omit<User, 'id'>>;

export type AssertedUser = {
  [K in keyof DefaultUser]: NonNullable<DefaultUser[K]>;
};

type CustomUser = AssertedUser & {
  id: string;
  admin: boolean;
  username: string;
};

export type CustomSession = Session & {
  user: CustomUser;
};
