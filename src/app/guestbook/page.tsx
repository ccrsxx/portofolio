import { getGuestbook, getSession } from '@lib/api';
import { generatePageMetadata } from '@lib/metadata';
import type { AuthUser } from '@lib/types/auth';
import type { Guestbook } from '@lib/types/guestbook';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { GuestbookClient } from './guestbook-client';

export const metadata: Metadata = generatePageMetadata({
  title: 'Guestbook',
  description: 'Sign my digital guestbook and share some wisdom.',
  pathname: '/guestbook'
});

export const dynamic = 'force-dynamic';

export default async function Guestbook(): Promise<React.JSX.Element> {
  const cookieStore = await cookies();
  const token = cookieStore.get('oauth-token')?.value;

  let session: AuthUser | null = null;
  let guestbook: Guestbook[] = [];

  try {
    if (token) session = await getSession(token);
  } catch (error) {
    console.error('guestbook ssr session error', error);
  }

  try {
    guestbook = await getGuestbook();
  } catch (error) {
    console.error('guestbook ssr guestbook error', error);
  }

  return <GuestbookClient session={session} guestbook={guestbook} />;
}
