import Image, { type ImageProps, type StaticImageData } from 'next/image';
import { clsx } from 'clsx';
import { useModal } from '@lib/hooks/use-modal';
import { preventBubbling } from '@lib/helper';
import { Modal } from './modal';

type ImagePreviewProps = Omit<ImageProps, 'src'> & {
  src: StaticImageData;
  customLink?: string;
  wrapperClassName?: string;
};

export function ImagePreview({
  src,
  alt,
  className,
  customLink,
  wrapperClassName
}: ImagePreviewProps): React.JSX.Element {
  const { open, openModal, closeModal } = useModal();

  const { src: imageLink } = src;

  const imageIsGif = imageLink.endsWith('.gif');
  const placeholder: ImageProps['placeholder'] = imageIsGif ? 'empty' : 'blur';

  customLink ??= imageLink;

  return (
    <>
      <Modal open={open} closeModal={closeModal}>
        <div className='relative'>
          <div className='group relative max-w-6xl'>
            <Image
              className='max-h-[70vh] w-fit rounded-md object-contain'
              src={src}
              alt={alt}
              placeholder={placeholder}
            />
            <a
              className='bg-background/40 text-foreground/80 hover:bg-accent-main! focus-visible:bg-accent-main! absolute right-0 bottom-0 mx-2 mb-2 translate-y-4 rounded-md px-2 py-1 text-sm opacity-0 outline-hidden transition group-hover:translate-y-0 group-hover:opacity-100 hover:text-white focus-visible:translate-y-0 focus-visible:text-white focus-visible:opacity-100'
              href={customLink}
              target='_blank'
              rel='noreferrer'
              onClick={preventBubbling()}
            >
              {alt}
            </a>
          </div>
          <a
            className='text-foreground/80 hover:text-foreground hover:decoration-foreground focus-visible:text-foreground absolute -bottom-7 left-0 font-medium underline decoration-transparent underline-offset-2 outline-hidden transition-colors focus-visible:decoration-inherit'
            href={customLink}
            target='_blank'
            rel='noreferrer'
            onClick={preventBubbling()}
          >
            Open original
          </a>
        </div>
      </Modal>
      <button
        className={clsx('smooth-tab grid', wrapperClassName)}
        onClick={openModal}
      >
        <Image
          className={clsx(
            'mx-auto cursor-pointer rounded-md transition hover:brightness-75',
            className
          )}
          src={src}
          alt={alt}
          title={alt}
          placeholder={placeholder}
        />
      </button>
    </>
  );
}
