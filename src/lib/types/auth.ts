export const AUTH_ROLE = ['admin', 'user'] as const;

export type AuthRole = (typeof AUTH_ROLE)[number];

export type AuthUser = {
  id: string;
  name: string;
  role: AuthRole;
  image: string;
  email: string;
  username: string;
};
