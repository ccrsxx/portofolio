export const PUBLIC_URL = process.env.NEXT_PUBLIC_URL as string;

export const OWNER_BEARER_TOKEN = process.env
  .NEXT_PUBLIC_OWNER_BEARER_TOKEN as string;

export const IP_ADDRESS_SALT = process.env.IP_ADDRESS_SALT as string;

export const GITHUB_TOKEN = process.env.GITHUB_TOKEN as string;

export const VALID_ORIGIN_URL =
  process.env.NODE_ENV === 'development' ? 'http://localhost' : PUBLIC_URL;
