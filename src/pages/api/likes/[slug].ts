import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { contentsCollection } from '@lib/firebase/collections';
import { getSessionId, getTotalLikes } from '@lib/helper-server';
import type { LikeStatus } from '@lib/types/meta';
import type { APIResponse } from '@lib/types/helper';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<APIResponse<LikeStatus>>
): Promise<void> {
  const { slug } = req.query as { slug: string };

  const sessionId = getSessionId(req);
  const sessionIdFieldReference = `likesBy.${sessionId}`;

  try {
    const docRef = doc(contentsCollection, slug);

    const snapshot = await getDoc(docRef);
    const data = snapshot.data();

    if (!data) return res.status(404).json({ message: 'Content not found' });

    const { likesBy } = data;

    if (!(sessionId in likesBy)) likesBy[sessionId] = 0;

    let userLikes = likesBy[sessionId];

    if (req.method === 'GET') {
      const likes = getTotalLikes(likesBy);

      await updateDoc(docRef, {
        likes,
        [sessionIdFieldReference]: userLikes
      });

      return res.status(200).json({ likes, userLikes });
    }

    if (req.method === 'POST') {
      if (userLikes >= 5)
        return res.status(422).json({ message: 'Likes limit reached' });

      userLikes += 1;

      const likes = getTotalLikes(likesBy) + 1;

      await updateDoc(docRef, {
        likes,
        [sessionIdFieldReference]: userLikes
      });

      return res.status(201).json({ likes, userLikes });
    }
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ message: error.message });

    return res.status(500).json({ message: 'Internal server error' });
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
