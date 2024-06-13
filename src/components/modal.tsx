"use client";
import { useEffect, useRef } from "react";
import { X } from "react-feather";

interface Props {
  content: React.ReactNode;
  footer?: React.ReactNode;
  isOpen: boolean;
  closeModal: () => void;
}

const Modal = ({ content, footer, closeModal, isOpen }: Props) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      } else if (e.key === "Tab" && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button:not([disabled]), [href]:not([aria-disabled="true"]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled])',
        ) as NodeListOf<HTMLElement>;

        if (focusableElements.length === 0) {
          e.preventDefault();
          return;
        }

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);

      const firstFocusable = modalRef.current?.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      ) as HTMLElement;
      firstFocusable?.focus();
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeModal, isOpen]);

  return (
    isOpen && (
      <dialog
        open={true}
        aria-modal="true"
      >
        <div
          onMouseDown={closeModal}
          className="modal-background"
        >
          <div
            onMouseDown={e => e.stopPropagation()}
            className="modal-box"
            ref={modalRef}
          >
            <div className="modal-title">
              <button
                aria-label="close"
                className="button-transparent"
                onClick={closeModal}
              >
                <X className="light-icon" />
              </button>
            </div>
            <div className="modal-content">{content}</div>
            {footer && <div className="modal-footer">{footer}</div>}
          </div>
        </div>
      </dialog>
    )
  );
};

export default Modal;
