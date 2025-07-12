import { NextResponse } from 'next/server';
import {
  getOrigin,
  getBearerToken,
  generateNextResponse
} from '@lib/helper-server';
import { frontendEnv, IS_DEVELOPMENT } from '@lib/env';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest): NextResponse {
  const origin = getOrigin(req);

  const isValidOrigin = IS_DEVELOPMENT
    ? [frontendEnv.NEXT_PUBLIC_URL, 'http://localhost:3000'].includes(
        origin as string
      )
    : origin === frontendEnv.NEXT_PUBLIC_URL;

  if (!isValidOrigin) return generateNextResponse(403, 'Forbidden');

  const bearerToken = getBearerToken(req);

  if (bearerToken !== frontendEnv.NEXT_PUBLIC_OWNER_BEARER_TOKEN)
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
