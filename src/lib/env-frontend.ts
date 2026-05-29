import { z } from 'zod';
import { validStringSchema, validateEnv } from './env';

export const frontendEnv = validateEnv(
  z.object({
    NEXT_PUBLIC_URL: validStringSchema,
    NEXT_PUBLIC_BACKEND_URL: validStringSchema,
    NEXT_PUBLIC_OWNER_BEARER_TOKEN: validStringSchema
  }),
  {
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
    NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
    NEXT_PUBLIC_OWNER_BEARER_TOKEN: process.env.NEXT_PUBLIC_OWNER_BEARER_TOKEN
  }
);
