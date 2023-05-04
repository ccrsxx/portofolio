import { doc, getDoc, increment, updateDoc } from 'firebase/firestore';
import { contentsCollection } from '@lib/firebase/collections';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { APIResponse } from '@lib/types/helper';
import type { Views } from '@lib/types/meta';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<APIResponse<Views>>
): Promise<void> {
  const { slug } = req.query as { slug: string };

  try {
    const docRef = doc(contentsCollection, slug);

    const snapshot = await getDoc(docRef);
    const data = snapshot.data();

    if (!data) return res.status(404).json({ message: 'Content not found' });

    const { views } = data;

    if (req.method === 'GET') return res.status(200).json(views);

    if (req.method === 'POST') {
      await updateDoc(docRef, {
        views: increment(1)
      });

      return res.status(201).json(views + 1);
    }
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ message: error.message });

    return res.status(500).json({ message: 'Internal server error' });
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
