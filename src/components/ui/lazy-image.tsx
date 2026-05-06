import { clsx } from 'clsx';
import Image, { type ImageProps } from 'next/image';
import { type SyntheticEvent, useState } from 'react';

export function LazyImage({
  src,
  alt,
  width,
  height,
  className,
  onLoad,
  ...rest
}: ImageProps): React.JSX.Element {
  const [loading, setLoading] = useState(true);

  const handleLoadingComplete = (e: SyntheticEvent<HTMLImageElement>): void => {
    onLoad?.(e);
    setLoading(false);
  };

  return (
    <Image
      className={clsx(
        className,
        loading && 'bg-muted-background animate-pulse'
      )}
      src={src}
      alt={alt}
      width={width}
      height={height}
      onLoad={handleLoadingComplete}
      {...rest}
    />
  );
}
