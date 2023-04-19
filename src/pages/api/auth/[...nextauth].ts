import NextAuth from 'next-auth/next';
import GithubProvider from 'next-auth/providers/github';
import { getGithubUsername } from '@lib/helper-server';
import type { AuthOptions } from 'next-auth';

export const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    })
  ],
  callbacks: {
    async session({ session, token }) {
      const userId = token.sub as string;
      const username = await getGithubUsername(userId);

      const admin = username === 'ccrsxx';

      return { ...session, user: { ...session.user, username, admin } };
    }
  }
};

export default NextAuth(authOptions);
