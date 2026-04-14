import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetcher } from '@lib/fetcher';
import type { Guestbook, Text } from '@lib/types/guestbook';
import type { AppQueryResult, AppMutationResult } from '@lib/types/api';

export const guestbookKeys = {
  all: ['guestbook'] as const
};

export function useGuestbook(
  fallbackData?: Guestbook[]
): AppQueryResult<Guestbook[]> {
  return useQuery({
    queryKey: guestbookKeys.all,
    queryFn: ({ signal }) => fetcher<Guestbook[]>('/api/guestbook', { signal }),
    initialData: fallbackData
  });
}

export function useAddGuestbookEntry(): AppMutationResult<Guestbook, Text> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (text: Text) =>
      fetcher<Guestbook>('/api/guestbook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      }),
    onSuccess: (newEntry) => {
      queryClient.setQueryData<Guestbook[]>(
        guestbookKeys.all,
        (oldGuestbook) => [newEntry, ...(oldGuestbook ?? [])]
      );
    }
  });
}

/* 
  Retrn
 */
export function useDeleteGuestbookEntry(): AppMutationResult<void, string> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      fetcher<void>(`/api/guestbook/${id}`, { method: 'DELETE' }),
    onSuccess: (_, deletedId) => {
      queryClient.setQueryData<Guestbook[]>(guestbookKeys.all, (oldGuestbook) =>
        oldGuestbook?.filter((entry) => entry.id !== deletedId)
      );
    }
  });
}
