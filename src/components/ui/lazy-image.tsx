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
        'transition duration-500',
        loading
          ? 'animate-pulse blur-md scale-110 bg-border'
          : 'blur-0 scale-100 bg-transparent'
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
