export const cloudflareTurnstileStatus = [
  'error',
  'expired',
  'solved'
] as const;

export type CloudflareTurnstileStatus =
  (typeof cloudflareTurnstileStatus)[number];
