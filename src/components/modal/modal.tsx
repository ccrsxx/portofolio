import { Dialog, DialogPanel } from '@headlessui/react';
import { clsx } from 'clsx';
import { AnimatePresence, motion, type MotionProps } from 'motion/react';
import { Fragment, type PropsWithChildren } from 'react';

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
}: ModalProps): React.JSX.Element {
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
            <DialogPanel as={Fragment}>
              <motion.div
                className={modalClassName}
                onClick={closePanelOnClick ? closeModal : undefined}
                {...modal}
              >
                {children}
              </motion.div>
            </DialogPanel>
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
