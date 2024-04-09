"use client";

import Link from "next/link";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";
import { X } from "react-feather";

interface Props {
  modalId: number | null;
  content: React.ReactNode;
  _footer?: React.ReactNode;
  okLink?: React.ReactNode;
  openModal: React.ReactNode;
  //onOK needs "use server"
  _onOk?: () => Promise<void>;
}

const Modal = ({ content, _footer, _onOk, okLink, openModal, modalId }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dialogRef = useRef<null | HTMLDialogElement>(null);
  const pathName = usePathname();
  let showModal = searchParams.get("showModal");
  const link = `?showModal=${modalId}`;

  useEffect(() => {
    if (showModal == modalId) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }

    if (showModal === modalId) {
      const modalElement = dialogRef.current;
      const focusableElements = modalElement!.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      const handleTabKeyPress = (event: KeyboardEvent) => {
        if (event.key === "Tab") {
          if (event.shiftKey && document.activeElement === firstElement) {
            event.preventDefault();
            (lastElement as HTMLDialogElement).focus();
          } else if (!event.shiftKey && document.activeElement === lastElement) {
            event.preventDefault();
            (firstElement as HTMLDialogElement).focus();
          }
        }
      };

      modalElement?.addEventListener("keydown", handleTabKeyPress);
      return () => {
        modalElement?.removeEventListener("keydown", handleTabKeyPress);
      };
    }
  }, [showModal, modalId, router, pathName]);

  const okClicked = () => {
    if (_onOk) _onOk();
  };

  const closeModal = () => {
    router.push(pathName);
  };

  const dialog: JSX.Element | null =
    showModal == modalId ? (
      <dialog ref={dialogRef}>
        <div
          onMouseDown={() => closeModal()}
          className="modal-background"
        >
          <div
            onMouseDown={e => e.stopPropagation()}
            className="modal-box"
          >
            <div className="modal-title">
              <Link href={pathName}>
                <X />
              </Link>
            </div>
            <div className="modal-content">
              {content}
              {_onOk ? (
                <Link
                  href={pathName}
                  onClick={() => okClicked()}
                >
                  {okLink}
                </Link>
              ) : null}
            </div>

            <div className="modal-footer">{_footer}</div>
          </div>
        </div>
      </dialog>
    ) : null;

  return (
    <>
      <Link href={link}>{openModal}</Link>
      {dialog}
    </>
  );
};

export default Modal;
