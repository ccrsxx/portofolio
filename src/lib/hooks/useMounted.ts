import { useState, useEffect } from 'react';

/**
 * Returns a boolean value indicating whether the component is mounted on the client.
 */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return mounted;
}
