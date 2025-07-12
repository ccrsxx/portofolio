import NextAuth from 'next-auth/next';
import GithubProvider from 'next-auth/providers/github';
import { backendEnv } from '@lib/env-server';
import { getGithubUsername } from '@lib/helper-server';
import type { AuthOptions, Session } from 'next-auth';
import type { CustomSession, AssertedUser } from '@lib/types/api';

export const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: backendEnv.GITHUB_ID,
      clientSecret: backendEnv.GITHUB_SECRET
    })
  ],
  callbacks: {
    async session({ session, token }): Promise<CustomSession> {
      const id = token.sub as string;
      const username = await getGithubUsername(id);

      const typedSession = session as Session & { user: AssertedUser };

      const admin = username === 'ccrsxx';

      return {
        ...typedSession,
        user: { ...typedSession.user, id, username, admin }
      };
    }
  }
};

export default NextAuth(authOptions);
