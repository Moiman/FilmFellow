"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Edit } from "react-feather";
import { toast } from "react-toastify";

import Modal from "@/components/modal";
import { RenameListForm } from "./renameListForm";
import { updateListName } from "@/services/listService";

export const RenameList = ({ id }: { id: number }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();

  const closeModal = () => {
    setIsOpen(false);
  };

  const renameList = async (formData: FormData) => {
    const name = formData.get("name");

    if (name) {
      await updateListName(id, name.toString());
      toast(
        <p>
          List was renamed to <span className="highlight-text">{name.toString()}</span>
        </p>,
        {
          icon: <Edit strokeWidth={2.5} />,
          className: "yellow-toast",
        },
      );
      setIsOpen(false);
    }

    router.refresh();
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
