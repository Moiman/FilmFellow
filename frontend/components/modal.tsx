"use client";
import { Suspense, useEffect } from "react";
import { X } from "react-feather";

interface Props {
  content: React.ReactNode;
  footer?: React.ReactNode;
  isOpen: boolean;
  closeModal: () => void;
}

const ModalComponent = ({ content, footer, closeModal, isOpen }: Props) => {
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

  return (
    isOpen && (
      <dialog open={true}>
        <div
          onMouseDown={closeModal}
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
            {footer && <div className="modal-footer">{footer}</div>}
          </div>
        </div>
      </dialog>
    )
  );
};

const Modal = (props: Props) => {
  return (
    <Suspense>
      <ModalComponent {...props} />
    </Suspense>
  );
};

export default Modal;
