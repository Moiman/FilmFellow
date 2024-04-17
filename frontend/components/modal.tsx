"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import React, { Suspense, useEffect, useRef } from "react";
import { X } from "react-feather";

interface Props {
  modalId: number | null;
  content: React.ReactNode;
  _footer?: React.ReactNode;
  okLink?: React.ReactNode;
  openModalButtonName: string;
  openModalButtonClassName?: string;
  //onOK needs "use server"
  _onOk?: () => Promise<void>;
}

const ModalComponent = ({
  content,
  _footer,
  _onOk,
  okLink,
  openModalButtonName,
  modalId,
  openModalButtonClassName,
}: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dialogRef = useRef<null | HTMLDialogElement>(null);
  const pathName = usePathname();
  let showModal = searchParams.get("showModal");
  const link = `?showModal=${modalId}`;

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
              <button
                aria-label="close"
                className="button-transparent"
                onClick={() => closeModal()}
              >
                <X color="#eff2f2" />
              </button>
            </div>
            <div className="modal-content">
              {content}
              {_onOk ? (
                <div
                  className="ok"
                  onClick={() => okClicked()}
                >
                  {okLink}
                </div>
              ) : null}
            </div>
            <div className="modal-footer">{_footer}</div>
          </div>
        </div>
      </dialog>
    ) : null;

  useEffect(() => {
    if (showModal == modalId) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
    document.addEventListener("keydown", e => {
      if (e.key == "Escape") router.push(pathName);
    });
  }, [showModal, modalId, router, pathName]);

  const okClicked = () => {
    if (_onOk) _onOk();
    closeModal();
  };

  const closeModal = () => {
    router.push(pathName);
  };

  return (
    <>
      <button
        className={openModalButtonClassName ? openModalButtonClassName : ""}
        onClick={() => router.push(link)}
      >
        {openModalButtonName}
      </button>
      {dialog}
    </>
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
