import { NextResponse } from 'next/server';
import {
  getOrigin,
  getBearerToken,
  generateNextResponse,
  isValidRequestMethod
} from '@lib/helper-server';
import { OWNER_BEARER_TOKEN, VALID_ORIGIN_URL } from '@lib/env';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest): NextResponse {
  const origin = getOrigin(req);

  if (origin !== VALID_ORIGIN_URL)
    return generateNextResponse(403, 'Invalid origin');

  if (!isValidRequestMethod(req))
    return generateNextResponse(405, 'Method not allowed');

  if (req.method === 'POST') {
    const bearerToken = getBearerToken(req);

    if (bearerToken !== OWNER_BEARER_TOKEN)
      return generateNextResponse(401, 'Invalid token');
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*'
};
