import {
  ApplicationError,
  BackendErrorSchema,
  BackendSuccessSchema
} from './types/api';

/**
 * A fetcher function that adds the owner bearer token to the request.
 */
export async function fetcher<T>(
  input: string,
  init?: RequestInit
): Promise<T> {
  try {
    const res = await fetch(input, init);

    if (res.status === 204) return null as unknown as T;

    const rawData: unknown = await res.json();

    if (!res.ok) {
      console.error('fetcher error response', rawData);

      const parsedData = BackendErrorSchema.safeParse(rawData);

      const message = parsedData.success
        ? parsedData.data.error.message
        : 'An unknown response error occurred';

      throw new ApplicationError(message, res.status);
    }

    const parsedData = BackendSuccessSchema.safeParse(rawData);

    if (!parsedData.success) {
      throw new ApplicationError('Invalid response data from backend', 500);
    }

    return parsedData.data.data as T;
  } catch (err) {
    console.error('fetcher error', {
      input,
      init,
      err
    });

    if (err instanceof Error && err.name === 'AbortError') throw err;

    if (err instanceof ApplicationError) throw err;

    if (err instanceof Error) throw new ApplicationError(err.message, 500);

    throw new ApplicationError('An unknown error occurred', 500);
  }
}
