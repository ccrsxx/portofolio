import { getDocs, query, where } from 'firebase/firestore';
import { contentsCollection } from '@lib/firebase/collections';
import { isValidContentType } from '@lib/helper-server';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { APIResponse } from '@lib/types/helper';
import type { ContentType } from '@lib/types/contents';

type StatsData = {
  totalPosts: number;
  totalViews: number;
  totalLikes: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<APIResponse<StatsData>>
): Promise<void> {
  const { type } = req.query as { type: ContentType };

  if (!isValidContentType(type))
    return res.status(400).json({ message: 'Invalid content type' });

  const snapshot = await getDocs(
    query(contentsCollection, where('type', '==', type))
  );

  const contents = snapshot.docs.map((doc) => doc.data());

  const [totalPosts, totalViews, totalLikes] = contents.reduce(
    ([accPosts, accViews, accLikes], { views, likes }) => [
      accPosts + 1,
      accViews + views,
      accLikes + likes
    ],
    [0, 0, 0]
  );

  res.status(200).json({ totalPosts, totalViews, totalLikes });
}
