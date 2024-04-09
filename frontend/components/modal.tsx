"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
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
  const searchParams = useSearchParams();
  const dialogRef = useRef<null | HTMLDialogElement>(null);
  const pathName = usePathname();
  let showModal = searchParams.get("showModal");
  const link = `?showModal=${modalId}`;

  useEffect(() => {
    if (showModal == modalId) {
      dialogRef.current?.show();
    } else {
      dialogRef.current?.close();
    }
  }, [showModal, modalId]);

  const okClicked = () => {
    if (_onOk) _onOk();
  };

  const dialog: JSX.Element | null =
    showModal == modalId ? (
      <dialog ref={dialogRef}>
        <div className="modal-background">
          <div className="modal-box">
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
