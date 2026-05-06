import { LazyImage } from '@components/ui/lazy-image';
import { Loading } from '@components/ui/loading';
import { preventBubbling } from '@lib/helper';
import { useModal } from '@lib/hooks/use-modal';
import { clsx } from 'clsx';
import Image, { type ImageProps, type StaticImageData } from 'next/image';
import { useState } from 'react';
import { Modal } from './modal';

type ImagePreviewProps = Omit<ImageProps, 'src'> & {
  src: StaticImageData | string;
  customLink?: string;
  wrapperClassName?: string;
};

export function ImagePreview({
  src,
  alt,
  width,
  height,
  tabIndex,
  className,
  customLink,
  wrapperClassName
}: ImagePreviewProps): React.JSX.Element {
  const imageFromStringURL = typeof src === 'string';

  const [loading, setLoading] = useState(imageFromStringURL);

  const { open, openModal, closeModal } = useModal();

  const handleLoadingComplete = (): void => setLoading(false);

  const imageLink = imageFromStringURL ? src : src.src;

  const imageIsGif = imageFromStringURL || imageLink.endsWith('.gif');

  const placeholder: ImageProps['placeholder'] = imageIsGif ? 'empty' : 'blur';

  customLink ??= imageLink;

  return (
    <>
      <Modal open={open} closeModal={closeModal}>
        {loading ? (
          <Loading />
        ) : (
          <div className='relative mx-2'>
            <div className='group relative'>
              {imageFromStringURL ? (
                <LazyImage
                  className='w-fit rounded-md object-contain max-h-[80vh]'
                  src={src}
                  alt={alt}
                  width={width}
                  height={height}
                  placeholder={placeholder}
                />
              ) : (
                <Image
                  className='w-fit rounded-md object-contain max-h-[80vh]'
                  src={src}
                  alt={alt}
                  placeholder={placeholder}
                />
              )}
              <a
                className='bg-background/40 text-foreground/80 hover:bg-accent-main! focus-visible:bg-accent-main! 
                           absolute right-0 bottom-0 mx-2 mb-2 translate-y-4 rounded-md px-2 py-1 text-sm opacity-0 outline-hidden 
                           transition group-hover:translate-y-0 group-hover:opacity-100 hover:text-white focus-visible:translate-y-0 
                           focus-visible:text-white focus-visible:opacity-100'
                href={customLink}
                target='_blank'
                rel='noreferrer'
                onClick={preventBubbling()}
              >
                {alt}
              </a>
            </div>
            <a
              className='text-foreground/80 hover:text-foreground hover:decoration-foreground focus-visible:text-foreground 
                           absolute -bottom-7 left-0 font-medium underline decoration-transparent underline-offset-2 outline-hidden 
                           transition-colors focus-visible:decoration-inherit'
              href={customLink}
              target='_blank'
              rel='noreferrer'
              onClick={preventBubbling()}
            >
              Open original
            </a>
          </div>
        )}
      </Modal>
      <button
        className={clsx(
          'grid transition [&:hover,.group:hover_&]:brightness-75',
          wrapperClassName
        )}
        tabIndex={tabIndex}
        onClick={openModal}
      >
        {imageFromStringURL ? (
          <LazyImage
            className={clsx('mx-auto cursor-pointer rounded-md', className)}
            src={src}
            alt={alt}
            width={width}
            height={height}
            placeholder={placeholder}
            onLoad={handleLoadingComplete}
          />
        ) : (
          <Image
            className={clsx('mx-auto cursor-pointer rounded-md', className)}
            src={src}
            alt={alt}
            placeholder={placeholder}
          />
        )}
      </button>
    </>
  );
}
