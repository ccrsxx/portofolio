import { useState } from 'react';
import { clsx } from 'clsx';
import Image from 'next/image';
import type { ImageProps } from 'next/image';

export function LazyImage({
  src,
  alt,
  width,
  height,
  className,
  ...rest
}: ImageProps): JSX.Element {
  const [loading, setLoading] = useState(true);

  const handleLoadingComplete = (): void => setLoading(false);

  return (
    <Image
      className={clsx(
        className,
        loading && 'animate-pulse bg-gray-600 dark:bg-gray-300'
      )}
      src={src}
      alt={alt}
      width={width}
      height={height}
      onLoadingComplete={handleLoadingComplete}
      {...rest}
    />
  );
}
