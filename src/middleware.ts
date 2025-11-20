import { NextResponse, type NextRequest } from 'next/server';
import { getBearerToken, generateNextResponse } from '@lib/helper-server';
import { frontendEnv } from '@lib/env';

export function middleware(req: NextRequest): NextResponse {
  const bearerToken = getBearerToken(req);

  if (bearerToken !== frontendEnv.NEXT_PUBLIC_OWNER_BEARER_TOKEN) {
    return generateNextResponse(401, 'Unauthorized');
  }

  return NextResponse.next();
}

type Config = {
  matcher: string;
};

export const config: Config = {
  // Match all API routes except /api/auth/*
  matcher: '/api/((?!auth).*)'
};
