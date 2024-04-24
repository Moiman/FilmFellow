"use client";
import React, { Suspense, useCallback, useEffect, useRef } from "react";
import { X } from "react-feather";

interface Props {
  content: React.ReactNode;
  footer?: React.ReactNode;
  isOpen: boolean;
  closeModal: () => void;
}

const ModalComponent = ({ content, footer, closeModal, isOpen }: Props) => {
  const dialogRef = useRef<null | HTMLDialogElement>(null);

  const dialog: JSX.Element | null = isOpen ? (
    <dialog
      ref={dialogRef}
      open={true}
    >
      <div
        onMouseDown={() => {
          closeModal();
        }}
        className="modal-background"
      >
        <div
          onMouseDown={e => e.stopPropagation()}
          className="modal-box"
        >
          <div className="modal-title">
            <button
              aria-label="close"
              className="button-transparent"
              onClick={closeModal}
            >
              <X color="#eff2f2" />
            </button>
          </div>
          <div className="modal-content">{content}</div>
          <div className="modal-footer">{footer}</div>
        </div>
      </div>
    </dialog>
  ) : null;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeModal]);

  return <>{dialog}</>;
};

const Modal = (props: Props) => {
  return (
    <Suspense>
      <ModalComponent {...props} />
    </Suspense>
  );
};

export default Modal;
