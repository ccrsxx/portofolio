import { useQuery } from '@tanstack/react-query';
import { fetcher } from '@lib/fetcher';
import { ApplicationError, type AppQueryResult } from '@lib/types/api';
import { frontendEnv } from '@lib/env';
import type { AuthUser } from '@lib/types/auth'; // Map to your Go struct

export const authKeys = {
  all: ['session'] as const
};

export function useSession(
  fallbackData?: AuthUser | null
): AppQueryResult<AuthUser> {
  return useQuery({
    queryKey: authKeys.all,
    initialData: fallbackData as AuthUser | undefined,
    queryFn: ({ signal }) =>
      fetcher<AuthUser>(`${frontendEnv.NEXT_PUBLIC_BACKEND_URL}/auth/me`, {
        signal
      }),
    retry: (failureCount, error) => {
      if (error instanceof ApplicationError) {
        if (error.statusCode === 401) return false;

        return failureCount < 3;
      }

      return false;
    }
  });
}
