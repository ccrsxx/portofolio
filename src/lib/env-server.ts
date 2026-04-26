import { z } from 'zod';
import { validStringSchema } from './env';

const envSchema = z.object({
  // Secrets
  GH_TOKEN: validStringSchema,
  PRIVATE_SECRET_KEY: validStringSchema,
  INTERNAL_BACKEND_URL: validStringSchema
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
