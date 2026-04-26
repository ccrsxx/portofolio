import { type NextRequest } from 'next/server';

/**
 * Returns the bearer token from the request headers.
 */
export function getBearerToken(req: NextRequest): string | null {
  const authorization = req.headers.get('authorization');

  if (!authorization) return null;

  const [authType, bearerToken] = authorization.split(' ');

  if (authType.toLowerCase() !== 'bearer' || !bearerToken) return null;

  return bearerToken;
}

/**
 * Returns the origin from the request headers.
 */
export function getOrigin(req: NextRequest): string | null {
  const origin = req.headers.get('origin');

  if (origin) return origin;

  const referer = req.headers.get('referer');

  if (!referer) return null;

  const originFromReferer = new URL(referer).origin;

  return originFromReferer;
}
