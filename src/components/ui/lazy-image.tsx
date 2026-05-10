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
      style={{
        transitionProperty: 'filter, scale, background-color'
      }}
      className={clsx(
        className,
        'duration-500 hover:duration-300',
        loading
          ? 'blur-md scale-110 bg-border animate-pulse'
          : 'blur-none scale-100 bg-transparent'
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
