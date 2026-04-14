import { frontendEnv } from './env';
import { ApplicationError, BackendErrorSchema } from './types/api';

/**
 * A fetcher function that adds the owner bearer token to the request.
 */
export async function fetcher<T>(
  input: string,
  init?: RequestInit
): Promise<T> {
  try {
    const res = await fetch(input, {
      ...init,
      headers: {
        ...init?.headers,
        Authorization: `Bearer ${frontendEnv.NEXT_PUBLIC_OWNER_BEARER_TOKEN}`
      }
    });

    const data: unknown = await res.json();

    if (!res.ok) {
      const parsedData = BackendErrorSchema.safeParse(data);

      const message = parsedData.success
        ? parsedData.data.error.message
        : 'An unknown response error occurred';

      throw new ApplicationError(message, res.status);
    }

    return data as T;
  } catch (err) {
    if (err instanceof Error && err.name === 'AbortError') throw err;

    if (err instanceof ApplicationError) throw err;

    if (err instanceof Error) throw new ApplicationError(err.message, 500);

    throw new ApplicationError('An unknown error occurred', 500);
  }
}
