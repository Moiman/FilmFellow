"use client";

import { useState } from "react";

import Modal from "@/components/modal";
import { NewListForm } from "@/components/newListForm";
import { createNewList } from "@/services/listService";

export const NewListModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const newListAction = async (formData: FormData) => {
    const name = formData.get("name");
    if (name) {
      await createNewList(name.toString());
      setIsOpen(false);
    }
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Add new list</button>
      <Modal
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        content={<NewListForm formAction={newListAction} />}
      />
    </>
  );
};
