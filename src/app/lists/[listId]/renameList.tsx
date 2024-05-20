"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Edit } from "react-feather";
import Modal from "@/components/modal";
import { RenameListForm } from "./renameListForm";
import { updateListName } from "@/services/listService";

export const RenameList = ({ id }: { id: number }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();

  const closeModal = () => {
    setIsOpen(false);
  };

  const renameList = (formData: FormData) => {
    const name = formData.get("name");

    if (name) {
      const list = updateListName(id, name.toString());
      setIsOpen(false);
    }
    router.push("/lists/" + id);
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
        content={<RenameListForm formAction={renameList} />}
        isOpen={isOpen}
        closeModal={closeModal}
      />
    </>
  );
};
