import { useState, useEffect, type Dispatch, type SetStateAction } from 'react';

/**
 * Get state from local storage.
 *
 * @param key The key of the state.
 * @param initialValue The initial value of the state.
 * @returns The state and the state setter. State is fallback to the initial value if the local storage is empty.
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState(() => {
    const savedValue =
      typeof window !== 'undefined' ? localStorage.getItem(key) : null;
    const parsedValue = savedValue ? (JSON.parse(savedValue) as T) : null;
    return parsedValue ?? initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
