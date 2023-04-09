import { NextResponse } from 'next/server';
import {
  getOrigin,
  getBearerToken,
  generateNextResponse
} from '@lib/helper-server';
import { OWNER_BEARER_TOKEN, PUBLIC_URL, IS_DEVELOPMENT } from '@lib/env';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest): NextResponse {
  const origin = getOrigin(req);

  const isValidOrigin = IS_DEVELOPMENT
    ? [PUBLIC_URL, 'http://localhost'].includes(origin as string)
    : origin === PUBLIC_URL;

  if (!isValidOrigin) return generateNextResponse(403, 'Forbidden');

  const bearerToken = getBearerToken(req);

  if (bearerToken !== OWNER_BEARER_TOKEN)
    return generateNextResponse(401, 'Unauthorized');

  return NextResponse.next();
}

type Config = {
  matcher: string;
};

export const config: Config = {
  // Match all API routes except /api/auth/* and /api/og
  matcher: '/api/((?!auth|og).*)'
};
