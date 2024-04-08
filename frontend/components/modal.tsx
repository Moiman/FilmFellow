"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useRef } from "react";
import { X } from "react-feather";

interface Props {
  content: React.ReactNode;
  _footer?: React.ReactNode;
  okLink?: React.ReactNode;
  openModal: React.ReactNode;
  //onOK needs "use server"
  _onOk?: () => Promise<void>;
}

const Modal = ({ content, _footer, _onOk, okLink, openModal }: Props) => {
  const searchParams = useSearchParams();
  const dialogRef = useRef<null | HTMLDialogElement>(null);
  const pathName = usePathname();
  let showModal = searchParams.get("showModal");

  useEffect(() => {
    if (showModal === "y") {
      dialogRef.current?.show();
    } else {
      dialogRef.current?.close();
    }
  }, [showModal]);

  const okClicked = () => {
    //check if _onOk exists
    if (_onOk) _onOk();
  };

  //shows modal when url has showmodal = y
  //content div renders button if _onOk has a function
  const dialog: JSX.Element | null =
    showModal === "y" ? (
      <dialog ref={dialogRef}>
        <div className="modal-background">
          <div className="modal-box">
            <div className="modal-title">
              <Link href={pathName}>
                <X />
              </Link>
            </div>
            <div className="modal-content">{content}</div>
            {_onOk ? (
              <div className="modal-btn">
                <Link
                  href={pathName}
                  onClick={() => okClicked()}
                >
                  {okLink}
                </Link>
              </div>
            ) : null}
            <div className="modal-footer">{_footer}</div>
          </div>
        </div>
      </dialog>
    ) : null;

  return (
    <>
      <Link href="?showModal=y">{openModal}</Link>
      {dialog}
    </>
  );
};

export default Modal;
