import './modal.css';
import { useEffect, useRef, type ReactNode } from 'react';

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
};

// Built on the native <dialog> element rather than a hand-rolled overlay — it
// gives focus trapping, Escape-to-close, and backdrop click handling for free.
export function Modal({ open, onClose, title, children }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      className='modal'
      aria-labelledby='modal-title'
      onClose={onClose}
      onCancel={onClose}
    >
      <div className='modal-header'>
        <h2 id='modal-title'>{title}</h2>
        <button
          type='button'
          className='modal-close'
          onClick={onClose}
          aria-label='Close'
        >
          ×
        </button>
      </div>
      <div className='modal-body'>{children}</div>
    </dialog>
  );
}
