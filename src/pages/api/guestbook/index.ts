import { getServerSession } from 'next-auth';
import { addDoc, Timestamp, serverTimestamp } from 'firebase/firestore';
import { getGuestbook } from '@lib/api';
import { guestbookCollection } from '@lib/firebase/collections';
import { authOptions } from '../auth/[...nextauth]';
import type { AuthOptions } from 'next-auth';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { WithFieldValue } from 'firebase/firestore';
import type { CustomSession } from '@lib/types/api';
import type { APIResponse } from '@lib/types/helper';
import type { Guestbook } from '@lib/types/guestbook';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<APIResponse<Guestbook | Guestbook[]>>
): Promise<void> {
  try {
    if (req.method === 'GET') {
      const guestbook = await getGuestbook();

      return res.status(200).json(guestbook);
    }

    if (req.method === 'POST') {
      const session = await getServerSession<AuthOptions, CustomSession>(
        req,
        res,
        authOptions
      );

      if (!session) return res.status(401).json({ message: 'Unauthorized' });

      const { text } = req.body as Pick<Guestbook, 'text'>;

      if (!text)
        return res.status(422).json({ message: "Text can't be empty" });

      const { user } = session;

      const data: WithFieldValue<Omit<Guestbook, 'id'>> = {
        ...user,
        text,
        createdAt: serverTimestamp()
      };

      await addDoc(guestbookCollection, data);

      const newestGuestbook = {
        ...data,
        id: Math.random().toString(),
        createdAt: Timestamp.now()
      } as Guestbook;

      return res.status(201).json(newestGuestbook);
    }
  } catch (err) {
    if (err instanceof Error)
      return res.status(500).json({ message: err.message });

    return res.status(500).json({ message: 'Internal server error' });
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
