// env.backend.ts
import { z } from 'zod';
import { validStringSchema, validateEnv } from './env';

export const backendEnv = validateEnv(
  z.object({
    GH_TOKEN: validStringSchema,
    PRIVATE_SECRET_KEY: validStringSchema,
    INTERNAL_BACKEND_URL: validStringSchema
  })
);
