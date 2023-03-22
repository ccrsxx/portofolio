import { isValidContentType } from '@lib/helper-server';
import { getContentStatistics } from '@lib/api';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { APIResponse } from '@lib/types/helper';
import type { ContentType } from '@lib/types/contents';
import type { ContentStatistics } from '@lib/types/statistics';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<APIResponse<ContentStatistics>>
): Promise<void> {
  const { type } = req.query as { type: ContentType };

  if (!isValidContentType(type))
    return res.status(400).json({ message: 'Invalid content type' });

  try {
    if (req.method === 'GET') {
      const contentStatistics = await getContentStatistics(type);

      return res.status(200).json(contentStatistics);
    }
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ message: error.message });

    return res.status(500).json({ message: 'Internal server error' });
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
