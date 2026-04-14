import type { Session, User } from 'next-auth';

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
