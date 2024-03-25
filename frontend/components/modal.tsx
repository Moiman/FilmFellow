"use client";

import "@/sass/style.scss";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useRef } from "react";
import { X } from "react-feather";

interface Props {
  content: React.ReactNode;
  _footer?: React.ReactNode;
  //onOK needs "use server"
  _onOk?: () => Promise<void>;
  buttontxt?: string;
}

const Modal = ({ content, _footer, _onOk, buttontxt }: Props) => {
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
            <div className="modal-btn">
              {_onOk ? (
                <Link href={pathName}>
                  <button onClick={() => okClicked()}>{buttontxt}</button>
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
      <Link href="?showModal=y">
        <button>modal</button>
      </Link>
      {dialog}
    </>
  );
};

export default Modal;
