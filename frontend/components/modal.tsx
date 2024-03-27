"use client";

import "@/sass/style.scss";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useRef } from "react";
import { X } from "react-feather";

interface Props {
  title: string;
  content: React.ReactNode;
}

const Modal = ({ content, title }: Props) => {
  const searchParams = useSearchParams();
  const dialogRef = useRef<null | HTMLDialogElement>(null);
  const showDialog = searchParams.get("showDialog");

  useEffect(() => {
    if (showDialog === "y") {
      dialogRef.current?.show();
    } else {
      dialogRef.current?.close();
    }
  }, [showDialog]);

  return (
    <div>
      <Link href="new/?showDialog=y">test</Link>
      {showDialog === "y" ? (
        <dialog className="modal-background">
          <div className="modal-content">
            <div>
              <h1>{title}</h1>
              <X onClick={() => dialogRef.current?.close()} />
            </div>
            <div>{content}</div>
          </div>
        </dialog>
      ) : null}
    </div>
  );
};

export default Modal;
