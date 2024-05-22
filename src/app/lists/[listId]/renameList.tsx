"use client";

import { useState } from "react";
import { Edit } from "react-feather";

import Modal from "@/components/modal";
import { RenameListForm } from "./renameListForm";

export const RenameList = ({ id }: { id: number }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button
        className="button-transparent"
        onClick={() => setIsOpen(true)}
      >
        <Edit
          size={20}
          className="edit-button"
        />
      </button>

      <Modal
        content={
          <RenameListForm
            closeModal={closeModal}
            id={id}
          />
        }
        isOpen={isOpen}
        closeModal={closeModal}
      />
    </>
  );
};
