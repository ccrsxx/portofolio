import { z } from 'zod';

export const validStringSchema = z.string().trim().min(1);

const envSchema = z.object({
  NEXT_PUBLIC_URL: validStringSchema,
  NEXT_PUBLIC_OWNER_BEARER_TOKEN: validStringSchema
});

type EnvSchema = z.infer<typeof envSchema>;

function validateEnv(): EnvSchema {
  let { data, error } = envSchema.safeParse({
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
    NEXT_PUBLIC_OWNER_BEARER_TOKEN: process.env.NEXT_PUBLIC_OWNER_BEARER_TOKEN
  });

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

export const frontendEnv = validateEnv();

export const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';
