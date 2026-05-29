import { z } from 'zod';

export const validStringSchema = z.string().trim().min(1);

export function validateEnv<T extends z.ZodRawShape>(
  schema: z.ZodObject<T>
): z.infer<typeof schema> {
  let { data, error } = schema.safeParse(process.env);

  const runningOnCi = process.env.CI === 'true';

  if (runningOnCi) {
    data = process.env as unknown as z.infer<typeof schema>;
  }

  const shouldThrowError = error && !runningOnCi;

  if (shouldThrowError) {
    throw new Error(`Environment validation error: ${error.message}`);
  }

  return data as z.infer<typeof schema>;
}

export const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';

export const IS_PRODUCTION = process.env.NODE_ENV === 'production';
