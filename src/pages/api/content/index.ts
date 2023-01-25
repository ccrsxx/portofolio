import { getDocs } from 'firebase/firestore';
import { contentsCollection } from '@lib/firebase/collections';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { APIResponse } from '@lib/types/helper';

type TotalData = {
  totalViews: number;
  totalLikes: number;
};

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<APIResponse<TotalData>>
): Promise<void> {
  const snapshot = await getDocs(contentsCollection);
  const contents = snapshot.docs.map((doc) => doc.data());

  const [totalViews, totalLikes] = contents.reduce(
    ([accViews, accLikes], { views, likes }) => [
      accViews + views,
      accLikes + likes
    ],
    [0, 0]
  );

  res.status(200).json({ totalViews, totalLikes });
}
