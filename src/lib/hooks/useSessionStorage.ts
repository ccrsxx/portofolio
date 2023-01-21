import { useState, useEffect } from 'react';
import type { Dispatch, SetStateAction } from 'react';

/**
 * Get state from session storage.
 *
 * @param key The key of the state.
 * @param initialValue The initial value of the state.
 * @returns The state and the state setter. State is fallback to the initial value if the session storage is empty.
 */
export function useSessionStorage<T>(
  key: string,
  initialValue: T
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState(() => {
    const savedValue =
      typeof window !== 'undefined' ? sessionStorage.getItem(key) : null;
    const parsedValue = savedValue ? (JSON.parse(savedValue) as T) : null;
    return parsedValue ?? initialValue;
  });

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
