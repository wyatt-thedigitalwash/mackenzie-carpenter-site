"use client";

import { useEffect, useRef, type MouseEvent } from "react";

// Drives a native <dialog> from React state. showModal() gives us the focus
// trap, Escape-to-close, inert background, and focus restore for free.
export function useModalDialog(open: boolean, onClose: () => void) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  // Clicking the ::backdrop registers as a click on the dialog element itself.
  function onBackdropClick(e: MouseEvent<HTMLDialogElement>) {
    if (e.target === e.currentTarget) onClose();
  }

  return { ref, dialogProps: { onClose, onClick: onBackdropClick } };
}
