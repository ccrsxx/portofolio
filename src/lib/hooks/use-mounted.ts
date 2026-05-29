import { useSyncExternalStore } from 'react';

const emptySubscribe = (): (() => void) => () => {};

/**
 * Returns a boolean value indicating whether the component is mounted on the client.
 */
export function useMounted(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}
