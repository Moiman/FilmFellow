"use client";

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
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [showDialog]);

  const dialog =
    showDialog === "y" ? (
      <dialog>
        <div>
          <div>
            <h1>{title}</h1>
            <X onClick={() => dialogRef.current?.close()} />
          </div>
          <div>{content}</div>
        </div>
      </dialog>
    ) : null;

  return (
    <>
      <Link href="/?showDialog=y"></Link>
      {dialog}
    </>
  );
};

export default Modal;
