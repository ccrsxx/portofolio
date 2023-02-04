import NextAuth from 'next-auth/next';
import GithubProvider from 'next-auth/providers/github';
import { getGithubUsername } from '@lib/helper-server';
import type { AuthOptions } from 'next-auth';

export const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string
    })
  ],
  callbacks: {
    async session({ session, token }) {
      const userId = token.sub as string;
      const username = await getGithubUsername(userId);

      return { ...session, user: { ...session.user, username } };
    }
  }
};

export default NextAuth(authOptions);
