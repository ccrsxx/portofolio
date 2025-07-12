import useSWR from 'swr';
import { fetcher } from '@lib/fetcher';
import type { ValidApiEndpoints } from '@lib/types/api';
import type { Guestbook, Text } from '@lib/types/guestbook';

type ContentGuestbook = {
  guestbook?: Guestbook[];
  isLoading: boolean;
  registerGuestbook: (text: Text) => Promise<void>;
  unRegisterGuestbook: (id: string) => Promise<void>;
};

/**
 * Returns the guestbook data and a function to register guestbook.
 */
export function useGuestbook(fallbackData: Guestbook[]): ContentGuestbook {
  const {
    data: guestbook,
    isLoading,
    mutate
  } = useSWR<Guestbook[], unknown, ValidApiEndpoints>(
    '/api/guestbook',
    fetcher,
    { fallbackData }
  );

  const registerGuestbook = async (text: Text): Promise<void> => {
    const newGuestbook = await fetcher<Guestbook>('/api/guestbook', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });

    await mutate([newGuestbook, ...(guestbook ?? [])]);
  };

  const unRegisterGuestbook = async (id: string): Promise<void> => {
    await fetcher(`/api/guestbook/${id}`, { method: 'DELETE' });

    const newGuestbook = guestbook?.filter((entry) => entry.id !== id);

    await mutate(newGuestbook);
  };

  return { guestbook, isLoading, registerGuestbook, unRegisterGuestbook };
}
