import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Returns the bearer token from the request headers.
 */
export function getBearerToken(req: NextRequest): string | null {
  const authorization = req.headers.get('authorization');

  if (!authorization) return null;

  const bearerToken = authorization.split(' ')[1];

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

type ValidRequestsMethod = typeof VALID_REQUESTS_METHODS[number];

const VALID_REQUESTS_METHODS = ['GET', 'POST'] as const;

/**
 * Returns true if the request method is `GET` or `POST`
 */
export function isValidRequestMethod(
  req: NextRequest
): req is NextRequest & { method: ValidRequestsMethod } {
  return VALID_REQUESTS_METHODS.includes(req.method as ValidRequestsMethod);
}

type ValidContentTypes = typeof VALID_CONTENT_TYPES[number];

export const VALID_CONTENT_TYPES = ['blog', 'projects'] as const;

/**
 * Returns true if the content type is `blog` or `projects`.
 */
export function isValidContentType(type: string): type is ValidContentTypes {
  return VALID_CONTENT_TYPES.includes(type as ValidContentTypes);
}

/**
 * Returns a NextResponse with the given status and message.
 */
export function generateNextResponse(
  status: number,
  message: string
): NextResponse {
  return new NextResponse(JSON.stringify({ message }), {
    status,
    headers: { 'content-type': 'application/json' }
  });
}
