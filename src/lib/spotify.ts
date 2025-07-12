import { backendEnv } from './env-server';
import type { FullNowPlaying } from './types/spotify';

type AccessToken = {
  scope: string;
  expires_in: number;
  token_type: string;
  access_token: string;
};

/**
 * Returns the access token from the Spotify API.
 */
export async function getAccessToken(): Promise<AccessToken> {
  const token = Buffer.from(
    `${backendEnv.SPOTIFY_CLIENT_ID}:${backendEnv.SPOTIFY_CLIENT_SECRET}`
  ).toString('base64');

  const tokenBody = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: backendEnv.SPOTIFY_REFRESH_TOKEN
  });

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: tokenBody
  });

  const data = (await response.json()) as AccessToken;

  return data;
}

/**
 * Returns the currently playing song from the Spotify API.
 */
export async function getNowPlaying(): Promise<FullNowPlaying | null> {
  const { access_token } = await getAccessToken();

  const response = await fetch(
    'https://api.spotify.com/v1/me/player/currently-playing',
    {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    }
  );

  if (!response.ok || response.status === 204) return null;

  const data = (await response.json()) as FullNowPlaying;

  return data;
}
