import { frontendEnv } from '@lib/env';
import { fetcher } from '@lib/fetcher';
import type { AppMutationResult, AppQueryResult } from '@lib/types/api';
import type { Guestbook, Text } from '@lib/types/guestbook';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const guestbookKeys = {
  all: ['guestbook'] as const
};

export function useGuestbook(
  fallbackData?: Guestbook[]
): AppQueryResult<Guestbook[]> {
  return useQuery({
    queryKey: guestbookKeys.all,
    queryFn: ({ signal }) =>
      fetcher<Guestbook[]>(`${frontendEnv.NEXT_PUBLIC_BACKEND_URL}/guestbook`, {
        signal
      }),
    initialData: fallbackData
  });
}

export function useAddGuestbookEntry(): AppMutationResult<Guestbook, Text> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (text: Text) =>
      fetcher<Guestbook>(`${frontendEnv.NEXT_PUBLIC_BACKEND_URL}/guestbook`, {
        body: JSON.stringify({ text }),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      }),
    onSuccess: (newEntry) => {
      queryClient.setQueryData<Guestbook[]>(
        guestbookKeys.all,
        (oldGuestbook) => [newEntry, ...(oldGuestbook ?? [])]
      );
    }
  });
}

export function useDeleteGuestbookEntry(): AppMutationResult<void, string> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      fetcher<void>(`${frontendEnv.NEXT_PUBLIC_BACKEND_URL}/guestbook/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      }),
    onSuccess: (_, deletedId) => {
      queryClient.setQueryData<Guestbook[]>(guestbookKeys.all, (oldGuestbook) =>
        oldGuestbook?.filter((entry) => entry.id !== deletedId)
      );
    }
  });
}
