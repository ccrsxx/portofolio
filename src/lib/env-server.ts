import { z } from 'zod';
import { validStringSchema } from './env';

const envSchema = z.object({
  // Email
  EMAIL_TARGET: validStringSchema,
  EMAIL_ADDRESS: validStringSchema,
  EMAIL_PASSWORD: validStringSchema,

  // Secrets
  GITHUB_TOKEN: validStringSchema,
  IP_ADDRESS_SALT: validStringSchema,

  // NextAuth
  NEXTAUTH_URL: validStringSchema,
  NEXTAUTH_SECRET: validStringSchema,
  GITHUB_ID: validStringSchema,
  GITHUB_SECRET: validStringSchema,

  // Firebase
  API_KEY: validStringSchema,
  AUTH_DOMAIN: validStringSchema,
  PROJECT_ID: validStringSchema,
  STORAGE_BUCKET: validStringSchema,
  MESSAGING_SENDER_ID: validStringSchema,
  APP_ID: validStringSchema,

  // Spotify
  SPOTIFY_CLIENT_ID: validStringSchema,
  SPOTIFY_CLIENT_SECRET: validStringSchema,
  SPOTIFY_REFRESH_TOKEN: validStringSchema
});

type EnvSchema = z.infer<typeof envSchema>;

function validateEnv(): EnvSchema {
  let { data, error } = envSchema.safeParse(process.env);

  const runningOnCi = process.env.CI === 'true';

  if (runningOnCi) {
    data = process.env as unknown as EnvSchema;
  }

  const shouldThrowError = error && !runningOnCi;

  if (shouldThrowError) {
    throw new Error(`Environment validation error: ${error.message}`);
  }

  return data as EnvSchema;
}

export const backendEnv = validateEnv();
