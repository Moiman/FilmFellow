"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { Film } from "react-feather";

import Modal from "@/components/modal";
import { NewListForm } from "@/components/newListForm";
import { createNewList } from "@/services/listService";

interface FormData {
  listName: string;
}

export const NewListModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const newListAction = async (formData: FormData) => {
    if (formData.listName) {
      await createNewList(formData.listName.toString());
      setIsOpen(false);

      toast(
        <p>
          List <span className="highlight-text">{formData.listName.toString()}</span> was created
        </p>,
        { icon: <Film />, className: "yellow-toast" },
      );
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
