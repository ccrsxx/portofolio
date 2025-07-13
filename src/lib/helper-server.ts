import { NextResponse, type NextRequest } from 'next/server';
import { backendEnv } from './env-server';
import type { GithubUser } from './types/github';

/**
 * Returns the username with the given user id from the GitHub API.
 */
export async function getGithubUsername(userId: string): Promise<string> {
  const response = await fetch(`https://api.github.com/user/${userId}`, {
    headers: { Authorization: `Bearer ${backendEnv.GITHUB_TOKEN}` }
  });

  const { login } = (await response.json()) as GithubUser;

  return login;
}

/**
 * Returns total likes from the given likes object.
 */
export function getTotalLikes(likes: Record<string, number>): number {
  return Object.values(likes).reduce((accLikes, like) => accLikes + like, 0);
}

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

type ValidContentTypes = (typeof VALID_CONTENT_TYPES)[number];

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
