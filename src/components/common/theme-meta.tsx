'use client';

import { useMounted } from '@lib/hooks/use-mounted';
import { useTheme } from 'next-themes';

/**
 * Client component that handles theme-dependent meta tags.
 * These can't be in generateMetadata because they react to the
 * client-side theme state managed by next-themes.
 */
export function ThemeMeta(): React.JSX.Element | null {
  const { theme } = useTheme();
  const mounted = useMounted();

  if (!mounted) return null;

  const isDarkMode = theme === 'dark';

  return (
    <>
      <meta name='color-scheme' content={isDarkMode ? 'dark' : 'light'} />
      <meta name='theme-color' content={isDarkMode ? '#000000' : '#ffffff'} />
    </>
  );
}
