import { doc, getDoc, increment, updateDoc } from 'firebase/firestore';
import { contentsCollection } from '@lib/firebase/collections';
import { isValidContentType } from '@lib/helper-server';
import type { ContentMeta } from '@lib/types/meta';
import type { Response } from '@lib/types/api';
import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * TODO: Sometimes the views returns 1 from firebase.
 * This only happens when I increment the views from the API.
 * Need to investigate why this happens later.
 */

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response<ContentMeta>>
): Promise<void> {
  const { content } = req.query as { content: string[] };

  const [type, slug] = content as [ContentMeta['type'], string];

  if (content.length > 2 || !isValidContentType(type))
    res.status(400).json({ message: 'Invalid content type or slug' });

  try {
    const snapshot = await getDoc(doc(contentsCollection, slug));
    const data = snapshot.data();

    if (!data) return res.status(404).json({ message: 'Content not found' });

    if (req.method === 'GET') return res.status(200).json(data);

    if (req.method === 'POST') {
      await updateDoc(doc(contentsCollection, slug), {
        views: increment(1)
      });

      return res.status(200).json({ message: 'content views incremented' });
    }
  } catch (err) {
    if (err instanceof Error)
      return res.status(500).json({ message: err.message });

    return res.status(500).json({ message: 'Internal server error' });
  }
}
