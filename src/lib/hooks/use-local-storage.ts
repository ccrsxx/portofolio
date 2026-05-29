import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';

/**
 * Get state from local storage.
 *
 * @param key The key of the state.
 * @param initialValue The initial value of the state.
 * @param overrideValue The override value of the state. If provided, it will always take precedence over local storage and the initial value.
 * @returns The state and the state setter. State falls back to the initial value if local storage is empty.
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  overrideValue?: T
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    if (overrideValue !== undefined) return overrideValue;

    let savedValue: string | null = null;

    if (typeof window !== 'undefined') savedValue = localStorage.getItem(key);

    let parsedValue: T | null = null;

    if (savedValue) parsedValue = JSON.parse(savedValue) as T;

    return parsedValue ?? initialValue;
  });

  useEffect(() => {
    if (overrideValue === undefined) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setValue(overrideValue);
  }, [overrideValue]);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
