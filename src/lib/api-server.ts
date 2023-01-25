import { promisify } from 'util';
import { scrypt, randomBytes } from 'crypto';
import type { NextApiRequest } from 'next';

const scryptAsync = promisify(scrypt);

/**
 * Returns a hashed session id from the user's IP address.
 */
export async function getSessionId(req: NextApiRequest): Promise<string> {
  const originalIpAddress = req.headers['x-forwarded-for'] as
    | string
    | undefined;

  const ipAddress = originalIpAddress ?? '127.0.0.1';

  const salt = originalIpAddress ? randomBytes(16).toString('hex') : '';

  const buffer = (await scryptAsync(ipAddress, salt, 20)) as Buffer;

  const hashedIpAddress = buffer.toString('hex');

  return hashedIpAddress;
}
