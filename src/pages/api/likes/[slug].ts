import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { contentsCollection } from '@lib/firebase/collections';
import { getSessionId } from '@lib/api-server';
import type { LikeStatus } from '@lib/types/meta';
import type { APIResponse } from '@lib/types/helper';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<APIResponse<LikeStatus>>
): Promise<void> {
  const { slug } = req.query as { slug: string };

  const sessionId = await getSessionId(req);

  try {
    const docRef = doc(contentsCollection, slug);

    const snapshot = await getDoc(docRef);
    const data = snapshot.data();

    if (!data) return res.status(404).json({ message: 'Content not found' });

    const { likesBy } = data;

    if (!(sessionId in likesBy)) likesBy[sessionId] = 0;

    const userLikes = likesBy[sessionId];

    if (req.method === 'GET') {
      const likes = Object.values(likesBy).reduce((acc, curr) => acc + curr, 0);

      await updateDoc(docRef, {
        likes,
        likesBy
      });

      return res.status(200).json({ likes, userLikes });
    }

    if (req.method === 'POST') {
      if (userLikes >= 5)
        return res.status(422).json({ message: 'Likes limit reached' });

      likesBy[sessionId] += 1;

      const likes = Object.values(likesBy).reduce((acc, curr) => acc + curr, 0);

      await updateDoc(docRef, {
        likes,
        likesBy
      });

      return res.status(201).json({ likes, userLikes: userLikes + 1 });
    }
  } catch (err) {
    if (err instanceof Error)
      return res.status(500).json({ message: err.message });

    return res.status(500).json({ message: 'Internal server error' });
  }
}
