import { getServerSession } from 'next-auth';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import { guestbookCollection } from '@lib/firebase/collections';
import { authOptions } from '../auth/[...nextauth]';
import type { AuthOptions } from 'next-auth';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { CustomSession } from '@lib/types/api';
import type { APIResponse } from '@lib/types/helper';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<APIResponse>
): Promise<void> {
  if (req.method === 'DELETE')
    try {
      const session = await getServerSession<AuthOptions, CustomSession>(
        req,
        res,
        authOptions
      );

      if (!session) return res.status(401).json({ message: 'Unauthorized' });

      const { id } = req.query as { id: string };

      const docRef = doc(guestbookCollection, id);

      const guestbookData = (await getDoc(docRef)).data();

      if (!guestbookData) return res.status(404).json({ message: 'Not found' });

      const {
        user: { id: createdBy, admin }
      } = session;

      const isOwner = createdBy === guestbookData.createdBy || admin;

      if (!isOwner) return res.status(403).json({ message: 'Forbidden' });

      await deleteDoc(docRef);

      return res.status(200).json({ message: 'Deleted successfully' });
    } catch (error) {
      if (error instanceof Error)
        return res.status(500).json({ message: error.message });

      return res.status(500).json({ message: 'Internal server error' });
    }

  return res.status(405).json({ message: 'Method not allowed' });
}
