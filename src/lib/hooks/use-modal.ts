import { useState } from 'react';

type Modal = {
  open: boolean;
  openModal: () => void;
  closeModal: () => void;
};

/**
 * Returns a object with the modal state and functions to open and close it.
 */
export function useModal(): Modal {
  const [open, setOpen] = useState(false);

  const openModal = (): void => setOpen(true);
  const closeModal = (): void => setOpen(false);

  return { open, openModal, closeModal };
}
