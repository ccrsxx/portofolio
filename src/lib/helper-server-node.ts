import { createHash } from 'crypto';
import { backendEnv } from './env-server';
import type { NextApiRequest } from 'next';

/**
 * Returns a hashed session id from the user's IP address.
 */
export function getSessionId(req: NextApiRequest): string {
  const ipAddressFromHeaders = req.headers['x-forwarded-for'] as
    | string
    | undefined;

  const ipAddress = ipAddressFromHeaders ?? '127.0.0.1';

  const hashedIpAddress = createHash('md5')
    .update(ipAddress + backendEnv.IP_ADDRESS_SALT)
    .digest('hex');

  return hashedIpAddress;
}
