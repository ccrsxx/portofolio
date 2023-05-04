import { AnimatePresence, motion } from 'framer-motion';
import { Dialog } from '@headlessui/react';
import { clsx } from 'clsx';
import type { PropsWithChildren } from 'react';
import type { MotionProps } from 'framer-motion';

type ModalProps = PropsWithChildren<{
  open: boolean;
  className?: string;
  modalClassName?: string;
  closePanelOnClick?: boolean;
  closeModal: () => void;
}>;

export function Modal({
  open,
  children,
  className = 'grid place-items-center',
  modalClassName,
  closePanelOnClick,
  closeModal
}: ModalProps): JSX.Element {
  return (
    <AnimatePresence>
      {open && (
        <Dialog
          className='relative z-50'
          open={open}
          onClose={closeModal}
          static
        >
          <motion.div
            className='fixed inset-0 bg-black/40'
            aria-hidden='true'
            {...backdrop}
          />
          <div className={clsx('fixed inset-0 overflow-y-auto p-4', className)}>
            <Dialog.Panel
              className={modalClassName}
              as={motion.div}
              onClick={closePanelOnClick ? closeModal : undefined}
              {...modal}
            >
              {children}
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}

const variants: MotionProps[] = [
  {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  },
  {
    initial: { opacity: 0, scale: 0.8 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { type: 'spring', duration: 0.5, bounce: 0.4 }
    },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.15 } }
  }
];

const [backdrop, modal] = variants;
