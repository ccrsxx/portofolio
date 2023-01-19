import { useState, useEffect } from 'react';

/**
 * A hook that returns boolean if the component is mounted on the client
 *
 * @returns Returns boolean if the component is mounted on the client
 */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return mounted;
}
