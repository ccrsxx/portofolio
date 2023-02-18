import { useState } from 'react';
import { clsx } from 'clsx';
import Image from 'next/image';
import type { ImageProps } from 'next/image';

type GuestbookEntryProps = Pick<ImageProps, 'src' | 'alt'>;

export function GuestbookEntryAvatar({
  src,
  alt
}: GuestbookEntryProps): JSX.Element {
  const [loading, setLoading] = useState(true);

  const handleLoadingComplete = (): void => setLoading(false);

  return (
    <Image
      className={clsx(
        'main-border rounded-full transition hover:brightness-75',
        loading && 'animate-pulse bg-gray-600 dark:bg-gray-300'
      )}
      src={src}
      alt={alt}
      width={48}
      height={48}
      onLoadingComplete={handleLoadingComplete}
    />
  );
}
